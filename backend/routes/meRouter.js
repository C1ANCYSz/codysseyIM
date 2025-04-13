const router = require('express').Router();
const { protectRoute } = require('../controllers/authControllers');
const Roadmap = require('../models/Roadmap');
const AppError = require('../utils/AppError');
const User = require('../models/User');

router.post('/enroll/:id', protectRoute, async (req, res, next) => {
  const roadmapId = req.params.id;
  const userId = req.user?._id;

  const [roadmap, user] = await Promise.all([
    Roadmap.findById(roadmapId),
    User.findById(userId),
  ]);

  if (!roadmap) return next(new AppError('Roadmap not found', 404));
  if (!user) return next(new AppError('User not found', 404));

  const alreadyEnrolled = user.roadmaps.some(
    (entry) => entry.roadmap.toString() === roadmapId
  );

  if (alreadyEnrolled)
    return next(new AppError('you already enrolled in this roadmap', 400));

  user.roadmaps.push({ roadmap: roadmapId });

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    data: { roadmap },
  });
});

router.get('/dashboard', protectRoute, async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId)
    .populate({
      path: 'roadmaps.roadmap',
      select: 'title image ',
    })
    .lean();

  if (!user) return next(new AppError('User not found', 404));

  if (user.role === 'student') {
    return res.status(200).json({
      success: true,
      data: { user },
    });
  } else {
    return res.status(200).json({
      success: true,
      message: 'other dashboards to be added',
    });
  }
});

router.post('/roadmaps/:id/progress', protectRoute, async (req, res, next) => {
  const { id } = req.params;
  const { completedStages } = req.body;

  if (typeof completedStages !== 'number' || completedStages < 0) {
    return next(new AppError('Invalid or missing completedStages', 400));
  }

  const [roadmap, user] = await Promise.all([
    Roadmap.findById(id),
    User.findById(req.user._id),
  ]);

  if (!roadmap) return next(new AppError('Roadmap not found', 404));
  if (!user) return next(new AppError('User not found', 404));

  const userRoadmap = user.roadmaps.find(
    (entry) => entry.roadmap.toString() === id
  );

  if (!userRoadmap) {
    return next(new AppError('User is not enrolled in this roadmap', 404));
  }

  if (completedStages > roadmap.stages) {
    return next(
      new AppError(
        `completedStages cannot exceed total stages (${roadmap.stages})`,
        400
      )
    );
  }

  userRoadmap.completedStages = completedStages;
  userRoadmap.completed = completedStages === roadmap.stages;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: userRoadmap.completed
      ? 'Roadmap marked as completed!'
      : 'Progress updated.',
    data: {
      roadmapId: id,
      completedStages,
      completed: userRoadmap.completed,
    },
  });
});

module.exports = router;
