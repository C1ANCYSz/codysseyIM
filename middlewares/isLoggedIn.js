const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');

exports.isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(
        new AppError('You are unauthorized to perform this action', 401)
      );
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth error:', err);
    return next();
  }
};
