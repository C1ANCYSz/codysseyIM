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

router.get(
  '/content-managers',
  protectRoute,
  restrictTo('admin'),
  async (req, res, next) => {
    const contentManagers = await User.find({ role: 'content manager' });
    if (!contentManagers) {
      res.json({ success: true, data: {} });
    }
    res.json({ success: true, data: { contentManagers } });
  }
);

router.post(
  '/content-managers',
  protectRoute,
  restrictTo('admin'),
  async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(new AppError('No user found with this email', 404));
    }

    if (user.role !== 'content manager') {
      user.role = 'content manager';
      await user.save();
    }

    res.json({ success: true, message: 'User updated successfully' });
  }
);

router.get(
  '/academies',
  protectRoute,
  restrictTo('admin'),
  async (req, res, next) => {
    const academies = await User.find({ role: 'academy' });
    if (!academies) {
      res.json({ success: true, data: {} });
    }
    res.json({ success: true, data: { academies } });
  }
);

module.exports = router;
