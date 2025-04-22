const Roadmap = require('../models/Roadmap');
const AppError = require('../utils/AppError');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { generateCertificateHTML } = require('../utils/generateCertificateHTML');
const Certificate = require('../models/Certificate');
const UserRoadmap = require('../models/UserRoadmap');

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
    const certificates = await Certificate.find({ user: userId }).populate({
      path: 'roadmap',
      select: 'title image',
    });

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
