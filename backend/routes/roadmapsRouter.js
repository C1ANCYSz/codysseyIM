const router = require('express').Router();
const Roadmap = require('../models/Roadmap');
const { Stage, ContentStage, QuizStage } = require('../models/Stage');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const { protectRoute } = require('../controllers/authControllers');

router.get('/', async (req, res, next) => {
  const categories = await Roadmap.distinct('category').lean();

  const roadmaps = await Roadmap.find().select('title image category').lean();

  res.json({
    success: true,
    data: {
      categories,
      roadmaps,
    },
  });
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  let roadmap = await Roadmap.findById(id).lean();

  if (!roadmap) {
    return res.status(404).json({ message: 'Roadmap not found' });
  }

  const stages = await Stage.find({ roadmap: id })
    .select('title number description')
    .sort('number')
    .lean();

  roadmap = { ...roadmap, stages };

  res.json({
    success: true,
    data: { roadmap },
  });
});

router.get('/:id/stages/:number', protectRoute, async (req, res, next) => {
  const { id, number } = req.params;
  const currentUserId = req.user._id;
  const stage = await Stage.findOne({ roadmap: id, number })
    .select('-description -roadmap')
    .lean();

  const user = await User.findById(currentUserId);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const userRoadmap = user.roadmaps.find(
    (roadmap) => roadmap.roadmap.toString() === id
  );

  if (!userRoadmap) {
    return next(new AppError('User roadmap not found', 404));
  }

  console.log(userRoadmap.completedStages);

  if (userRoadmap.activeStage < number) {
    return next(
      new AppError(
        'complete the previous stage before progressing to the next stage',
        400
      )
    );
  }

  if (!stage) {
    return next(new AppError('Stage not found', 404));
  }

  if (stage.type === 'content') {
    const contentStage = await ContentStage.findById(stage._id).lean();
    return res.json({
      success: true,
      data: { stage: contentStage },
    });
  } else if (stage.type === 'quiz') {
    const quizStage = await QuizStage.findById(stage._id).lean();
    return res.json({
      success: true,
      data: { stage: quizStage },
    });
  }
  return res.status(400).json({ message: 'Invalid stage type' });
});

router.post('/', async (req, res, next) => {
  res.send('create a roadmap');
});

module.exports = router;
