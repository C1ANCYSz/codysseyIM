const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');
exports.protectRoute = async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in, please log in first', 401)
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new AppError('User not found', 401));
    }

    if (user.passwordChangedAt) {
      const changedTimestamp = parseInt(
        user.passwordChangedAt.getTime() / 1000,
        10
      );

      if (decoded.iat < changedTimestamp) {
        return next(new AppError('User recently changed password', 401));
      }
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('JWT verification failed:', err);

    if (err instanceof jwt.TokenExpiredError) {
      return res.redirect('/users/login?error=tokenExpired');
    }

    if (err instanceof jwt.JsonWebTokenError) {
      return res.redirect('/users/login?error=invalidToken');
    }

    return res.redirect('/users/login');
  }
};
