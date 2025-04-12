const express = require('express');
const {
  login,
  signUp,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require('../controllers/authControllers');

const router = express.Router();

router.post('/login', login);

router.post('/signup', signUp);

router.post('/logout', logout);

router.post('/verify-email', verifyEmail);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);

module.exports = router;
