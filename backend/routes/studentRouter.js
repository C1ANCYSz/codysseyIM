const router = require('express').Router();

const { restrictTo } = require('../middlewares/restrictTo');
const { protectRoute } = require('../middlewares/protectRoute');
const Quiz = require('../models/Quiz');

const {
  enrollInRoadmap,
  getDashboard,
  roadmapProgress,
  getCertificates,
  downloadCertificate,
} = require('../controllers/studentController');

router.post(
  '/enroll/:id',
  protectRoute,
  restrictTo('student'),
  enrollInRoadmap
);

router.get('/dashboard', protectRoute, restrictTo('student'), getDashboard);

router.post(
  '/roadmaps/:id/progress',
  protectRoute,
  restrictTo('student'),
  roadmapProgress
);

router.get(
  '/certificates',
  protectRoute,
  restrictTo('student'),
  getCertificates
);

router.get(
  '/certificates/:id/',
  protectRoute,
  restrictTo('student'),
  downloadCertificate
);

router.get('/exam-appointments', protectRoute, async (req, res, next) => {});

router.post(
  '/roadmaps/:id/stages/:number/submit-quiz',
  protectRoute,
  restrictTo('student'),
  async (req, res, next) => {
    const { id, number } = req.params;
    const { score } = req.body;
    const userId = req.user._id;

    let quiz = await Quiz.findOne({ user: userId, roadmap: id, stage: number });

    if (quiz) {
      if (score >= quiz.score) {
        quiz.score = score;
        await quiz.save();
      }
    } else {
      quiz = await Quiz.create({
        user: userId,
        roadmap: id,
        stage: number,
        score,
      });
    }

    return res.status(200).json({
      success: true,
      data: quiz.score,
    });
  }
);

module.exports = router;
