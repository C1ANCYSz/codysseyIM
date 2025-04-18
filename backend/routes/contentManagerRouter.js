const router = require('express').Router();
const { restrictTo } = require('../middlewares/restrictTo');
const { protectRoute } = require('../middlewares/protectRoute');
const { getAllRoadmaps } = require('../controllers/roadmapsController');
const Roadmap = require('../models/Roadmap');
const AppError = require('../utils/AppError');
const User = require('../models/User');

router.get(
  '/dashboard',
  protectRoute,
  restrictTo('content manager'),
  async (req, res, next) => {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError('No user found with this ID', 404));
    }
    if (user.role !== 'content manager') {
      return next(
        new AppError('You are not authorized to access this route', 403)
      );
    }
    const roadmaps = await Roadmap.find();
    if (!roadmaps) {
      return next(
        new AppError('No roadmaps found for this content manager', 404)
      );
    }

    res.status(200).json({
      success: true,

      roadmaps,
    });
  }
);
module.exports = router;
