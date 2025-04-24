const AppError = require('../utils/AppError');
const User = require('../models/User');
require('express-async-errors');

exports.updateUser = async (req, res, next) => {
  const { id } = req.user;
  const {
    password,
    confirmPassword,
    name,
    email,
    image,
    phoneNumber,
    locations,
  } = req.body;

  if (password || confirmPassword) {
    if (password !== confirmPassword) {
      return next(new AppError('Passwords do not match', 400));
    }
  }

  const user = await User.findById(id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  if (password) {
    user.password = password;
    res.clearCookie('token');
  }
  if (name) user.name = name;
  if (email) user.email = email;

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

  res.json({ success: true, message: 'User updated successfully', user });
};
