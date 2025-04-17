const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const validator = require('validator');
const User = require('./../models/User');
const mongoose = require('mongoose');
const AppError = require('../utils/AppError');
const {
  generateVerificationToken,
} = require('../utils/generateVerificationToken');

const {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendPasswordResetSuccess,
} = require('../mailtrap/emails');
/* 




*/
const tokenAndCookie = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',

    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
  });

  return token;
};

exports.login = async (req, res, next) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return next(
      new AppError('Please provide username or email and password', 400)
    );
  }
  email = validator.escape(email);

  const user = await User.findOne({ email: email }).select('+password');

  //to mitigate bruce force attack [TO BE IMPROVED]

  if (!user || !(await user.comparePassword(password))) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return next(new AppError('Incorrect username or password', 401));
  }

  tokenAndCookie(user._id, res);

  req.user = user;

  return res.status(200).json({
    success: true,
    message: 'logged in successfully',
    role: user.role,
  });
};

exports.signUp = async (req, res, next) => {
  let { name, email, password, confirmPassword } = req.body;

  email = email.trim();
  name = name.trim();

  email = validator.escape(email);

  if (!name || !email || !password || !confirmPassword) {
    return next(new AppError('Please provide all required fields', 400));
  }

  if (!validator.isEmail(email)) {
    return next(new AppError('Please provide a valid email', 400));
  }

  if (password.length < 8) {
    return next(
      new AppError('Password must be at least 8 characters long', 400)
    );
  }

  if (password !== confirmPassword) {
    return next(new AppError('Passwords do not match', 400));
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(
      new AppError('User with this email or username already exists', 400)
    );
  }
  const verificationToken = generateVerificationToken();
  let newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
    verificationToken,
    verificationTokenExpiresAt: Date.now() + 30 * 60 * 1000, // 30 mins
  });

  await sendVerificationEmail(newUser.email, verificationToken).catch((err) => {
    console.error('Error sending verification email:', err);
  });

  tokenAndCookie(newUser._id, res);

  res.status(201).json({
    success: true,
    data: {
      user: {
        _id: newUser._id,
        name,
        email: newUser.email,
        verified: false,
      },
    },
  });
};

exports.logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    success: true,
    message: 'logged out successfully',
  });
};

exports.verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.body;

  if (!verificationToken) {
    return res.render('verifyEmail', {
      message: 'Please provide verification token',
    });
  }

  const user = await User.findOne({
    verificationToken,
    verificationTokenExpiresAt: { $gt: Date.now() },
  });

  if (!user) {
    return res.render('verifyEmail', { message: 'Invalid or expired token' });
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiresAt = undefined;

  await user.save({ validateBeforeSave: false });

  tokenAndCookie(user._id, res);

  await sendWelcomeEmail(user.email, user.name);

  res.status(200).json({
    success: true,
    message: 'Email verified successfully',
  });
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email || !validator.isEmail(email)) {
    return next(new AppError('Please provide a valid email address', 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(200).json({
      success: true,
      message: 'Password reset link sent to email',
    });
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    await sendPasswordResetEmail(
      user.email,
      `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
    );

    return res.status(200).json({
      success: true,
      message: 'Password reset link sent to email',
    });
  } catch (emailErr) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Please try again later.',
        500
      )
    );
  }
};

exports.resetPassword = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      await session.abortTransaction();
      return next(
        new AppError('Please provide both password and confirmation', 400)
      );
    }

    if (password !== confirmPassword) {
      await session.abortTransaction();
      return next(new AppError('Passwords do not match', 400));
    }

    if (password.length < 8) {
      await session.abortTransaction();
      return next(new AppError('Password must be at least 8 characters', 400));
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpiresAt: { $gt: Date.now() },
    }).session(session);

    if (!user) {
      await session.abortTransaction();
      return next(new AppError('Token is invalid or has expired', 400));
    }

    user.password = password;
    user.passwordChangedAt = Date.now();
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    user.passwordResetToken = undefined;

    await user.save({ validateBeforeSave: false });
    await session.commitTransaction();

    await sendPasswordResetSuccess(user.email, user.name);

    return res.status(200).json({
      success: true,
      message: 'Password reset successfully!',
    });
  } catch (err) {
    await session.abortTransaction();
    return next(err);
  } finally {
    session.endSession();
  }
};
exports.checkAuth = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError('User not found', 401));
    }
    return res.json({ success: true, role: user.role });
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.json({ success: false });
  }
};
