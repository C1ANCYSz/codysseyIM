const router = require('express').Router();

const { protectRoute } = require('../middlewares/protectRoute');
const { restrictTo } = require('../middlewares/restrictTo');
const AppError = require('../utils/AppError');
const Appointment = require('../models/Appointment');
const {
  getNotification,
  getSettings,
  updateUser,
} = require('../controllers/userController');

router.get('/notification', protectRoute, getNotification);

router.get('/settings', protectRoute, getSettings);

router.put('/settings', protectRoute, updateUser);

module.exports = router;
