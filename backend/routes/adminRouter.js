const router = require('express').Router();
const { restrictTo } = require('../middlewares/restrictTo');
const { protectRoute } = require('../middlewares/protectRoute');
const Roadmap = require('../models/Roadmap');
const User = require('../models/User');
const UserRoadmap = require('../models/UserRoadmap');
const AppError = require('../utils/AppError');
const Notification = require('../models/Notification');
/*



*/

router.get(
  '/dashboard',
  protectRoute,
  restrictTo('admin'),
  async (req, res, next) => {
    const roadmaps = await Roadmap.countDocuments();
    const contentManagers = await User.countDocuments({
      role: 'content manager',
    });
    const academies = await User.countDocuments({ role: 'academy' });
    const students = await User.countDocuments({ role: 'student' });
    //get top 5 roadmaps and how many students completed them

    const topRoadmaps = await UserRoadmap.aggregate([
      { $match: { completed: true } },
      {
        $lookup: {
          from: 'roadmaps',
          localField: 'roadmap',
          foreignField: '_id',
          as: 'roadmap',
        },
      },
      { $unwind: '$roadmap' },
      {
        $group: {
          _id: '$roadmap._id',
          title: { $first: '$roadmap.title' },
          category: { $first: '$roadmap.category' },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 0,
          title: 1,
          category: 1,
          count: 1,
        },
      },
    ]);

    const roadmapsByCategory = await Roadmap.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          count: 1,
        },
      },
    ]);

    const usersPerDay = await User.aggregate([
      { $match: { role: 'student' } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, // ascending date order
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          count: 1,
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        roadmaps,
        contentManagers,
        academies,
        students,
        topRoadmaps,
        roadmapsByCategory,
        usersPerDay,
      },
    });
  }
);

router.get(
  '/content-managers',
  protectRoute,
  restrictTo('admin'),
  async (req, res, next) => {
    const contentManagers = await User.find({ role: 'content manager' }).select(
      '_id name email'
    );
    if (!contentManagers) {
      res.json({ success: true, data: {} });
    }
    res.json({ success: true, data: { contentManagers } });
  }
);

router.post(
  '/content-managers',
  protectRoute,
  restrictTo('admin'),
  async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(new AppError('No user found with this email', 404));
    }

    if (user.role !== 'content manager') {
      user.role = 'content manager';
      await user.save({ validateBeforeSave: false });
    }

    res.json({ success: true, message: 'User updated successfully' });
  }
);

router.get(
  '/academies',
  protectRoute,
  restrictTo('admin'),
  async (req, res, next) => {
    const academies = await User.find({ role: 'academy' });
    if (!academies) {
      res.json({ success: true, data: {} });
    }
    res.json({ success: true, data: { academies } });
  }
);

router.post(
  '/academies',
  protectRoute,
  restrictTo('admin'),
  async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(new AppError('No user found with this email', 404));
    }

    if (user.role !== 'academy') {
      user.role = 'academy';
      await user.save({ validateBeforeSave: false });
    }

    res.json({ success: true, message: 'User updated successfully' });
  }
);

router.post(
  '/notification',
  protectRoute,
  restrictTo('admin'),
  async (req, res, next) => {
    const { text } = req.body;

    let notification = await Notification.findOne();

    if (!notification) {
      await Notification.create({ text });
      return res.json({
        success: true,
        message: 'Notification created successfully',
      });
    }

    notification.text = text;
    await notification.save({ validateBeforeSave: false });

    res.json({ success: true, message: 'Notification updated successfully' });
  }
);

router.delete(
  '/notification',
  protectRoute,
  restrictTo('admin'),
  async (req, res, next) => {
    let notification = await Notification.findOne();

    if (!notification) {
      return next(new AppError('No notification found', 404));
    }

    await Notification.findByIdAndDelete(notification._id);

    res.json({ success: true, message: 'Notification deleted successfully' });
  }
);

module.exports = router;
