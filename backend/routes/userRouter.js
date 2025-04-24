const router = require('express').Router();

const { protectRoute } = require('../middlewares/protectRoute');
const {
  getNotification,
  getSettings,
  updateUser,
} = require('../controllers/userController');

router.get('/notification', protectRoute, getNotification);

router.get('/settings', protectRoute, getSettings);

router.put('/settings', protectRoute, updateUser);

module.exports = router;
