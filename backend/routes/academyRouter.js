const router = require("express").Router();

const { protectRoute } = require("../middlewares/protectRoute");
const { restrictTo } = require("../middlewares/restrictTo");
const User = require("../models/User");
const Roadmap = require("../models/Roadmap");
const AppError = require("../utils/AppError");
const Appointment = require("../models/Appointment");

router.get(
  "/dashboard",
  protectRoute,
  restrictTo("academy"),
  async (req, res, next) => {
    try {
      const now = new Date();

      // --- Date ranges ---
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999);

      const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const startOfLastMonth = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        1
      );
      const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      endOfLastMonth.setHours(23, 59, 59, 999);

      const user = await User.findById(req.user.id);

      // --- Current stats ---
      const uniqueStudents = await Appointment.distinct("user", {
        academy: req.user.id,
        status: { $ne: "rejected" },
      });

      const students = uniqueStudents.length;

      const accepted = await Appointment.countDocuments({
        academy: req.user.id,
        status: "accepted",
      });

      const completed = await Appointment.countDocuments({
        academy: req.user.id,
        status: "completed",
      });

      const pending = await Appointment.countDocuments({
        academy: req.user.id,
        status: "pending",
      });

      const passed = await Appointment.countDocuments({
        academy: req.user.id,
        status: "completed",
        score: { $gte: 50 },
      });

      const failed = await Appointment.countDocuments({
        academy: req.user.id,
        status: "completed",
        score: { $lt: 50 },
      });

      const todayAppointments = await Appointment.countDocuments({
        academy: req.user.id,
        examDate: { $gte: startOfToday, $lte: endOfToday },
      });

      // --- Previous month stats ---
      const studentsLastMonth = await Appointment.countDocuments({
        academy: req.user.id,
        createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
        status: { $ne: "rejected" },
      });

      const acceptedLastMonth = await Appointment.countDocuments({
        academy: req.user.id,
        createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
        status: "accepted",
      });

      const completedLastMonth = await Appointment.countDocuments({
        academy: req.user.id,
        createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
        status: "completed",
      });

      const pendingLastMonth = await Appointment.countDocuments({
        academy: req.user.id,
        createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
        status: "pending",
      });

      // --- Trends Calculation ---
      const calcTrend = (current, previous) => {
        if (previous === 0) return current > 0 ? 100 : 0; // avoid division by zero
        return Math.round(((current - previous) / previous) * 100);
      };

      const trends = {
        students: calcTrend(students, studentsLastMonth),
        accepted: calcTrend(accepted, acceptedLastMonth),
        completed: calcTrend(completed, completedLastMonth),
        pending: calcTrend(pending, pendingLastMonth),
      };

      // --- Locations breakdown ---
      const locations = await Appointment.aggregate([
        { $match: { academy: user._id } },
        {
          $group: {
            _id: "$location",
            pending: {
              $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
            },
            accepted: {
              $sum: { $cond: [{ $eq: ["$status", "accepted"] }, 1, 0] },
            },
            completed: {
              $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
            },
          },
        },
        {
          $project: {
            _id: 0,
            location: "$_id",
            pending: 1,
            accepted: 1,
            completed: 1,
          },
        },
      ]);

      // --- Final response ---
      res.json({
        success: true,
        data: {
          students,
          accepted,
          completed,
          pending,
          locations,
          passed,
          failed,
          todayAppointments,
          trends,
        },
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

router.get(
  "/appointments/pending",
  protectRoute,
  restrictTo("academy"),
  async (req, res, next) => {
    const appointments = await Appointment.find({
      academy: req.user.id,
      status: "pending",
    })
      .populate({
        path: "roadmap",
        select: "title image",
      })
      .populate({
        path: "user",
        select: "name email",
      })
      .select("-academy")
      .sort("-createdAt");

    const user = await User.findById(req.user.id);

    if (!appointments) {
      return res.json({ success: true, data: {} });
    }

    res.json({ success: true, appointments, locations: user.locations });
  }
);
router.get(
  "/appointments/accepted",
  protectRoute,
  restrictTo("academy"),
  async (req, res, next) => {
    const appointments = await Appointment.find({
      academy: req.user.id,
      status: "accepted",
    })
      .populate({
        path: "roadmap",
        select: "title image",
      })
      .populate({
        path: "user",
        select: "name email",
      })
      .select("-academy")
      .sort("-createdAt");

    if (!appointments) {
      return res.json({ success: true, data: {} });
    }

    const user = await User.findById(req.user.id);

    res.json({ success: true, appointments, locations: user.locations });
  }
);

router.get("/appointments/completed", protectRoute, async (req, res, next) => {
  const appointments = await Appointment.find({
    academy: req.user.id,
    status: "completed",
  })
    .populate({
      path: "roadmap",
      select: "title image",
    })
    .populate({
      path: "user",
      select: "name email",
    })
    .select("-academy")
    .sort("-createdAt");

  if (!appointments) {
    return res.json({ success: true, data: {} });
  }

  const user = await User.findById(req.user.id);

  res.json({ success: true, appointments, locations: user.locations });
});

router.put("/appointments/:id", protectRoute, async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { status, date, score } = req.body;

  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new AppError("No appointment found with this ID", 404));
  }

  const academy = await User.findById(userId);

  if (!academy || appointment.academy.toString() !== userId) {
    return next(
      new AppError("you are not allowed to perform this action", 401)
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
    message: "Successfully updated an appointment",
    data: { appointment },
  });
});

module.exports = router;
