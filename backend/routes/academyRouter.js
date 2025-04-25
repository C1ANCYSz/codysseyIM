const router = require('express').Router();

const { protectRoute } = require('../middlewares/protectRoute');
const { restrictTo } = require('../middlewares/restrictTo');
const User = require('../models/User');
const Roadmap = require('../models/Roadmap');
const AppError = require('../utils/AppError');
const Appointment = require('../models/Appointment');

router.get(
  '/dashboard',
  protectRoute,
  restrictTo('academy'),
  async (req, res, next) => {
    const appointments = await Appointment.find({
      academy: req.user.id,
      score: null,
    })
      .populate({
        path: 'roadmap',
        select: 'title image',
      })
      .populate({
        path: 'user',
        select: 'name email',
      })
      .select('-academy');

    if (!appointments) {
      return res.json({ success: true, data: {} });
    }

    res.json({ success: true, data: { appointments } });
  }
);

router.put('/appointments/:id', protectRoute, async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { status, date, score } = req.body;

  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new AppError('No appointment found with this ID', 404));
  }

  const academy = await User.findById(userId);

  if (!academy || appointment.academy.toString() !== userId) {
    return next(
      new AppError('you are not allowed to perform this action', 401)
    );
  }

  if (status) {
    appointment.status = status;
  }
  if (date) {
    appointment.examDate = date;
  }
  if (score) {
    appointment.score = score;
  }

  await appointment.save();

  res.status(200).json({
    success: true,
    message: 'Successfully updated an appointment',
    data: { appointment },
  });
});

module.exports = router;
