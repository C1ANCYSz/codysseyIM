const router = require('express').Router();

const { restrictTo } = require('../middlewares/restrictTo');
const { protectRoute } = require('../middlewares/protectRoute');
const User = require('../models/User');
const Roadmap = require('../models/Roadmap');
const AppError = require('../utils/AppError');
const Appointment = require('../models/Appointment');
const UserRoadmap = require('../models/UserRoadmap');
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

router.get('/appointments', protectRoute, async (req, res, next) => {
  const appointments = await Appointment.find({ user: req.user.id })
    .populate({
      path: 'roadmap',
      select: 'title image',
    })
    .populate({
      path: 'academy',
      select: 'name email image',
    });

  if (!appointments) {
    return res.json({ success: true, data: {} });
  }

  res.json({ success: true, data: { appointments } });
});

router.get('/book-appointment', protectRoute, async (req, res, next) => {
  const academies = await User.find({ role: 'academy' });

  if (!academies) {
    return res.json({ success: true, message: 'No academies found', data: {} });
  }

  res.json({ success: true, data: { academies } });
});

router.post('/book-appointment', protectRoute, async (req, res, next) => {
  const { roadmapId, academyId, location } = req.body;
  const { id } = req.user;

  const user = await User.findById(id);
  if (!user) {
    return next(new AppError('No user found with this ID', 404));
  }

  const roadmap = await Roadmap.findById(roadmapId);
  if (!roadmap) {
    return next(new AppError('No roadmap found with this ID', 404));
  }

  const userRoadmap = await UserRoadmap.findOne({
    user: id,
    roadmap: roadmapId,
  });
  if (!userRoadmap || !userRoadmap.completed) {
    return next(new AppError('You are not enrolled in this roadmap', 400));
  }

  const academy = await User.findById(academyId);
  if (!academy) {
    return next(new AppError('No academy found with this ID', 404));
  }

  if (!academy.locations.includes(location)) {
    return next(new AppError('This academy does not have this location', 400));
  }

  if (!location || !roadmapId || !academyId) {
    return next(new AppError('Please provide all the required fields', 400));
  }

  const sameAppointment = await Appointment.findOne({
    user: id,

    roadmap: roadmapId,
  });
  if (sameAppointment) {
    return next(
      new AppError('You already have an appointment for this roadmap', 400)
    );
  }

  const appointment = await Appointment.create({
    user: id,
    academy: academyId,
    roadmap: roadmapId,

    location,
  });

  res.status(201).json({
    success: true,
    message: 'Successfully created an appointment',
    data: { appointment },
  });
});

router.delete(
  '/appointments/:id',
  protectRoute,
  restrictTo('student'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const user = await User.findById(userId);
      if (!user) return next(new AppError('No user found with this ID', 404));

      const appointment = await Appointment.findById(id);
      if (!appointment)
        return next(new AppError('No appointment found with this ID', 404));

      if (
        (user.role === 'student' && appointment.user.toString() !== userId) ||
        (user.role === 'academy' && appointment.academy.toString() !== userId)
      ) {
        return next(
          new AppError('You are not allowed to delete this appointment', 403)
        );
      }

      await appointment.deleteOne();

      res.status(200).json({
        success: true,
        message: 'Successfully deleted an appointment',
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
