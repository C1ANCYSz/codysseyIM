const express = require('express');
const {
  login,
  signUp,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
} = require('../controllers/authControllers');

const router = express.Router();

router.post('/login', login);

router.post('/signup', signUp);

router.post('/logout', logout);

router.post('/forgot-password', forgotPassword);

router.post('/verify-email', verifyEmail);

router.post('/reset-password/:token', resetPassword);

router.get('/check', checkAuth);

module.exports = router;
