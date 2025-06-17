const router = require('express').Router();

const { restrictTo } = require('../middlewares/restrictTo');
const { protectRoute } = require('../middlewares/protectRoute');
const {
  enrollInRoadmap,
  getDashboard,
  roadmapProgress,
  getCertificates,
  downloadCertificate,
  answerQuestionnare,
  deleteAppointment,
  bookAppointment,
  getBookAppointments,
  getAppointments,
  getQuestionnare,
  getRecommendedRoadmaps,
  skipQuestionnare,
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

router.get(
  '/appointments',
  protectRoute,
  restrictTo('student'),
  getAppointments
);

router.get(
  '/book-appointment',
  protectRoute,
  restrictTo('student'),
  getBookAppointments
);

router.post(
  '/book-appointment',
  protectRoute,
  restrictTo('student'),
  bookAppointment
);

router.delete(
  '/appointments/:id',
  protectRoute,
  restrictTo('student'),
  deleteAppointment
);

router.post(
  '/answer-questionnare',
  protectRoute,
  restrictTo('student'),
  answerQuestionnare
);

router.get(
  '/questionnare',
  protectRoute,
  restrictTo('student'),
  getQuestionnare
);
router.get(
  '/roadmaps/recommended',
  protectRoute,
  restrictTo('student'),
  getRecommendedRoadmaps
);

router.put(
  '/skip-questionnare',
  protectRoute,
  restrictTo('student'),
  skipQuestionnare
);
module.exports = router;
