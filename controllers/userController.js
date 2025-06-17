const validator = require('validator');
const AppError = require('../utils/AppError');
const User = require('../models/User');
const Notification = require('../models/Notification');
require('express-async-errors');
const bcrypt = require('bcryptjs');

exports.updateUser = async (req, res, next) => {
  const { id } = req.user;
  const { password, newPassword, name, email, image, phoneNumber, locations } =
    req.body;

  if (!password) {
    return next(
      new AppError('Please provide your password for verification', 400)
    );
  }

  const user = await User.findById(id).select('+password');
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  if (!(await user.comparePassword(password))) {
    return next(new AppError('Incorrect password', 400));
  }

  if (newPassword) {
    user.password = newPassword;
    res.clearCookie('token');
  }

  if (name) user.name = name;
  if (email) {
    if (!validator.isEmail(email)) {
      return next(new AppError('Please provide a valid email', 400));
    }
    user.email = email;
  }

  if (user.role === 'content manager') {
    if (image) user.image = image;
    if (phoneNumber) user.phoneNumber = phoneNumber;
  }

  if (user.role === 'academy') {
    if (image) user.image = image;
    if (locations) user.locations = locations;
    if (phoneNumber) user.phoneNumber = phoneNumber;
  }

  await user.save({ validateBeforeSave: false });

  res.json({
    success: true,
    message: 'Updated successfully',
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image:
        user.role === 'content manager' || user.role === 'academy'
          ? user.image
          : undefined,
      phoneNumber:
        user.role === 'content manager' || user.role === 'academy'
          ? user.phoneNumber
          : undefined,
      locations: user.role === 'academy' ? user.locations : undefined,
    },
  });
};

exports.getSettings = async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findById(id).lean();
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const baseUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  if (user.role === 'content manager' || user.role === 'academy') {
    baseUser.phoneNumber = user.phoneNumber;
    baseUser.image = user.image;
  }

  if (user.role === 'academy') {
    baseUser.locations = user.locations;
  }

  res.status(200).json({
    success: true,
    data: { user: baseUser },
  });
};

exports.getNotification = async (req, res, next) => {
  const notification = await Notification.findOne();
  if (!notification) {
    return next(new AppError('No notification found', 404));
  }
  res.json({ success: true, data: { notification } });
};
