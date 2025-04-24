const router = require('express').Router();

const { protectRoute } = require('../middlewares/protectRoute');
const { getNotification } = require('../controllers/studentController');
const { updateUser } = require('../controllers/userController');
router.get('/notification', protectRoute, getNotification);

router.put('/settings', protectRoute, updateUser);

module.exports = router;
