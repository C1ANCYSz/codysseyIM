const router = require('express').Router();
const { restrictTo } = require('../middlewares/restrictTo');
const { protectRoute } = require('../middlewares/protectRoute');

const { getDashboard } = require('../controllers/contentManagerController');

router.get(
  '/dashboard',
  protectRoute,
  restrictTo('content manager'),
  getDashboard
);
module.exports = router;
