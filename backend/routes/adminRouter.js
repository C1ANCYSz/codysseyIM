const router = require('express').Router();
const { restrictTo } = require('../middlewares/restrictTo');
const { protectRoute } = require('../middlewares/protectRoute');

const User = require('../models/User');
/*



*/
router.get(
  '/dashboard',
  protectRoute,
  restrictTo('admin'),
  async (req, res, next) => {
    res.send('admin dashboard');
  }
);

router.put(
  '/update-role/:id',
  protectRoute,
  restrictTo('admin'),
  async (req, res, next) => {
    res.send('update role');
  }
);

module.exports = router;
