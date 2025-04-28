const User = require('../models/User');
const Roadmap = require('../models/Roadmap');
const UserRoadmap = require('../models/UserRoadmap');
const Certificate = require('../models/Certificate');
const Appointment = require('../models/Appointment');
const Question = require('../models/Question');

const AppError = require('../utils/AppError');

const path = require('path');
const fs = require('fs');

const puppeteer = require('puppeteer');

const { generateCertificateHTML } = require('../utils/generateCertificateHTML');

exports.enrollInRoadmap = async (req, res, next) => {
  const roadmapId = req.params.id;
  const userId = req.user?._id;

  const [roadmap, user, existingEnrollment] = await Promise.all([
    Roadmap.findById(roadmapId),
    User.findById(userId),
    UserRoadmap.findOne({ user: userId, roadmap: roadmapId }),
  ]);

  if (!roadmap) return next(new AppError('Roadmap not found', 404));
  if (!user) return next(new AppError('User not found', 404));

  if (existingEnrollment) {
    return next(new AppError('You are already enrolled in this roadmap', 400));
  }

  await UserRoadmap.create({
    user: userId,
    roadmap: roadmapId,
  });

  res.status(200).json({
    success: true,
    message: 'Successfully enrolled in roadmap',
    data: { roadmap },
  });
};

exports.getDashboard = async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId).lean();
  const userRoadmaps = await UserRoadmap.find({ user: userId })
    .populate({
      path: 'roadmap',
      select: 'title image stagesCount',
    })
    .select('roadmap completedStages completed _id')
    .lean();
  user.roadmaps = userRoadmaps;

  if (!user) return next(new AppError('User not found', 404));

  if (user.role === 'student') {
    return res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        role: user.role,
        name: user.name,
        roadmaps: user.roadmaps,
      },
    });
  }
};

exports.roadmapProgress = async (req, res, next) => {
  const { id } = req.params;
  const { completedStages } = req.body;

  if (typeof completedStages !== 'number' || completedStages < 0) {
    return next(new AppError('Invalid or missing completedStages', 400));
  }

  const [roadmap, user] = await Promise.all([
    Roadmap.findById(id),
    User.findById(req.user._id),
  ]);

  if (!roadmap) {
    return next(new AppError('Roadmap not found', 404));
  }

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const userRoadmap = await UserRoadmap.findOne({
    user: user._id,
    roadmap: id,
  });

  if (!userRoadmap) {
    return next(new AppError('User is not enrolled in this roadmap', 404));
  }

  if (completedStages > roadmap.stagesCount) {
    return next(
      new AppError(
        `completedStages cannot exceed total stages (${roadmap.stagesCount})`,
        400
      )
    );
  }

  userRoadmap.completedStages = completedStages;
  userRoadmap.completed = completedStages === roadmap.stagesCount;

  await userRoadmap.save({ validateBeforeSave: false });

  const certificate = await Certificate.findOne({
    user: user._id,
    roadmap: roadmap._id,
  });

  if (userRoadmap.completed && !certificate) {
    await Certificate.create({
      user: user._id,
      roadmap: roadmap._id,
      date: new Date(),
    });
  } else if (!userRoadmap.completed && certificate) {
    await Certificate.deleteOne({ user: user._id, roadmap: roadmap._id });
  }

  res.status(200).json({
    success: true,
    message: userRoadmap.completed ? 'Roadmap completed!' : 'Progress updated.',
    completed: userRoadmap.completed,
  });
};

exports.getCertificates = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const certificates = await Certificate.find({ user: userId })
      .populate({
        path: 'roadmap',
        select: 'title image',
      })
      .lean();

    for (const certificate of certificates) {
      const exists = await Appointment.exists({
        user: userId,
        roadmap: certificate.roadmap._id,
      });

      certificate.isBooked = !!exists;
    }

    if (certificates.length === 0) {
      return res.status(200).json({
        success: true,
        data: { certificates: [] },
      });
    }

    res.status(200).json({
      success: true,
      data: { certificates },
    });
  } catch (err) {
    next(err);
  }
};

exports.downloadCertificate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const user = await User.findById(userId);

    const certificate = await Certificate.findOne({
      user: userId,
      _id: id,
    }).populate({
      path: 'roadmap',
      select: 'title ',
    });

    if (!certificate) {
      return next(new AppError('Certificate not found', 404));
    }

    if (!user) return next(new AppError('User not found', 404));

    const certificateHTML = generateCertificateHTML(
      req.user,
      certificate.roadmap.title,
      certificate.date.toLocaleDateString()
    );

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(certificateHTML);
    await page.emulateMediaType('screen');

    const filePath = path.join(__dirname, 'certificate.pdf');
    await page.pdf({
      path: filePath,
      format: 'A4',
      landscape: true,
      printBackground: true,
    });

    await browser.close();

    const pdfBuffer = fs.readFileSync(filePath);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=certificate.pdf'
    );

    res.send(pdfBuffer);

    fs.unlinkSync(filePath);
  } catch (err) {
    next(err);
  }
};

exports.updateStudent = async (req, res, next) => {
  const { id } = req.user;

  const { password, name, email } = req.body;
  const user = await User.findById(id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  if (password) user.password = password;

  if (name) user.name = name;
  if (email) user.email = email;
  await user.save({ validateBeforeSave: false });
  res.json({ success: true, message: 'User updated successfully' });
};

exports.getAppointments = async (req, res, next) => {
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
};

exports.getBookAppointments = async (req, res, next) => {
  const academies = await User.find({ role: 'academy' });

  if (!academies) {
    return res.json({
      success: true,
      message: 'No academies found',
      data: {},
    });
  }

  res.json({ success: true, data: { academies } });
};

exports.bookAppointment = async (req, res, next) => {
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
};

exports.deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return next(new AppError('No user found with this ID', 404));

    const appointment = await Appointment.findById(id);

    if (!appointment)
      return next(new AppError('No appointment found with this ID', 404));

    if (
      user.role !== 'student' ||
      appointment.user.toString() !== userId ||
      appointment.status !== 'pending'
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
};

exports.answerQuestionnare = async (req, res) => {
  try {
    const { selectedAnswers } = req.body;

    if (!selectedAnswers || !Array.isArray(selectedAnswers)) {
      return res.status(400).json({ error: 'Invalid answers submitted' });
    }

    const questions = await Question.find({});
    const roadmaps = await Roadmap.find({}, 'title');

    const roadmapScores = roadmaps.reduce((acc, roadmap) => {
      acc[roadmap.title] = 0;
      return acc;
    }, {});

    selectedAnswers.forEach((answerText) => {
      questions.forEach((question) => {
        const answer = question.answers.find((a) => a.text === answerText);
        if (answer) {
          answer.impacts.forEach((impact) => {
            const matchingRoadmap = roadmaps.find((r) =>
              r.title.toLowerCase().includes(impact.roadmap.toLowerCase())
            );
            if (matchingRoadmap) {
              roadmapScores[matchingRoadmap.title] += impact.score;
            }
          });
        }
      });
    });

    const sortedRoadmaps = Object.entries(roadmapScores)
      .sort((a, b) => b[1] - a[1])
      .map(([roadmap, score]) => ({ title: roadmap, score }));

    if (sortedRoadmaps.length === 0 || sortedRoadmaps[0].score === 0) {
      return res.json({
        recommended: { title: 'General Roadmap', id: null },
      });
    }

    const topRoadmap = sortedRoadmaps[0];

    const selectedRoadmap = roadmaps.find((r) => r.title === topRoadmap.title);

    return res.json({
      recommended: {
        title: selectedRoadmap.title,
        id: selectedRoadmap._id,
      },
    });
  } catch (error) {
    console.error('Error submitting answers:', error);
    res.status(500).json({ error: 'Server error while submitting answers' });
  }
};
