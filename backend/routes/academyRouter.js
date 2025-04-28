const router = require('express').Router();

const { protectRoute } = require('../middlewares/protectRoute');
const { restrictTo } = require('../middlewares/restrictTo');

const {
  getDashboard,
  getPendingAppointments,
  getAcceptedAppointments,
  getCompletedAppointments,
  updateAppointment,
} = require('../controllers/academyController');

router.get('/dashboard', protectRoute, restrictTo('academy'), getDashboard);

router.get(
  '/appointments/pending',
  protectRoute,
  restrictTo('academy'),
  getPendingAppointments
);
router.get(
  '/appointments/accepted',
  protectRoute,
  restrictTo('academy'),
  getAcceptedAppointments
);

router.get(
  '/appointments/completed',
  protectRoute,
  restrictTo('academy'),
  getCompletedAppointments
);

router.put(
  '/appointments/:id',
  protectRoute,
  restrictTo('academy'),
  updateAppointment
);

module.exports = router;
