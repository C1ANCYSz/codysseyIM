const router = require('express').Router();
const { restrictTo } = require('../middlewares/restrictTo');
const { protectRoute } = require('../middlewares/protectRoute');

const {
  getDashboard,
  getContentManagers,
  manageContentManagers,
  getAcademies,
  manageAcademies,
  addNotification,
  deleteNotification,
  toggleRevoke,
} = require('../controllers/adminController');
/*



*/

router.get('/dashboard', protectRoute, restrictTo('admin'), getDashboard);

router.get(
  '/content-managers',
  protectRoute,
  restrictTo('admin'),
  getContentManagers
);

router.post(
  '/content-managers',
  protectRoute,
  restrictTo('admin'),
  manageContentManagers
);

router.get('/academies', protectRoute, restrictTo('admin'), getAcademies);

router.post('/academies', protectRoute, restrictTo('admin'), manageAcademies);

router.post(
  '/notification',
  protectRoute,
  restrictTo('admin'),
  addNotification
);

router.delete(
  '/notification',
  protectRoute,
  restrictTo('admin'),
  deleteNotification
);

router.put('/toggle-revoke', protectRoute, restrictTo('admin'), toggleRevoke);

module.exports = router;
