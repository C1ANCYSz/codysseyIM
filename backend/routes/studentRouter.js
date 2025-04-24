const router = require('express').Router();

const { restrictTo } = require('../middlewares/restrictTo');
const { protectRoute } = require('../middlewares/protectRoute');

const {
  enrollInRoadmap,
  getDashboard,
  roadmapProgress,
  getCertificates,
  downloadCertificate,
  getNotification,
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

module.exports = router;
