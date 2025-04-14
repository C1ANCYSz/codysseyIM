const router = require('express').Router();
const { protectRoute } = require('../controllers/authControllers');
const Roadmap = require('../models/Roadmap');
const AppError = require('../utils/AppError');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { generateCertificateHTML } = require('../utils/generateCertificateHTML');
router.post('/enroll/:id', protectRoute, async (req, res, next) => {
  const roadmapId = req.params.id;
  const userId = req.user?._id;

  const [roadmap, user] = await Promise.all([
    Roadmap.findById(roadmapId),
    User.findById(userId),
  ]);

  if (!roadmap) return next(new AppError('Roadmap not found', 404));
  if (!user) return next(new AppError('User not found', 404));

  const alreadyEnrolled = user.roadmaps.some(
    (entry) => entry.roadmap.toString() === roadmapId
  );

  if (alreadyEnrolled)
    return next(new AppError('you already enrolled in this roadmap', 400));

  user.roadmaps.push({ roadmap: roadmapId });

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    data: { roadmap },
  });
});

router.get('/dashboard', protectRoute, async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId)
    .populate({
      path: 'roadmaps.roadmap',
      select: 'title image stagesCount',
    })
    .lean();

  if (!user) return next(new AppError('User not found', 404));

  if (user.role === 'student') {
    return res.status(200).json({
      success: true,
      data: { user },
    });
  } else {
    return res.status(200).json({
      success: true,
      message: 'other dashboards to be added',
    });
  }
});

router.post('/roadmaps/:id/progress', protectRoute, async (req, res, next) => {
  const { id } = req.params;
  const { completedStages } = req.body;

  if (typeof completedStages !== 'number' || completedStages < 0) {
    return next(new AppError('Invalid or missing completedStages', 400));
  }

  const [roadmap, user] = await Promise.all([
    Roadmap.findById(id),
    User.findById(req.user._id),
  ]);

  if (!roadmap) return next(new AppError('Roadmap not found', 404));
  if (!user) return next(new AppError('User not found', 404));

  const userRoadmap = user.roadmaps.find(
    (entry) => entry.roadmap.toString() === id
  );

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

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: userRoadmap.completed
      ? 'Roadmap marked as completed!'
      : 'Progress updated.',
    data: {
      roadmapId: id,
      completedStages,
      completed: userRoadmap.completed,
    },
  });
});

router.get('/certificates', protectRoute, async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId).populate({
    path: 'roadmaps.roadmap',
    select: 'title image',
  });
  if (!user) return next(new AppError('User not found', 404));
  //select the roadmaps that has completed set to true
  const completedRoadmaps = user.roadmaps.filter(
    (roadmap) => roadmap.completed
  );
  res.status(200).json({
    success: true,
    data: {
      roadmaps: completedRoadmaps,
    },
  });
});

router.get(
  '/roadmaps/:id/certificate/download',
  protectRoute,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user._id;

      const [roadmap, user] = await Promise.all([
        Roadmap.findById(id),
        User.findById(userId),
      ]);

      if (!roadmap) return next(new AppError('Roadmap not found', 404));
      if (!user) return next(new AppError('User not found', 404));

      const userRoadmap = user.roadmaps.find(
        (entry) => entry.roadmap.toString() === id
      );
      if (!userRoadmap || !userRoadmap.completed) {
        return next(
          new AppError(
            'You must complete this roadmap to get a certificate',
            400
          )
        );
      }

      // Generate the certificate HTML
      const certificateHTML = generateCertificateHTML(user, roadmap);

      // Launch puppeteer browser to generate PDF
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(certificateHTML);
      await page.emulateMediaType('screen'); // Emulate screen media for better rendering

      // Save PDF to a temporary location
      const filePath = path.join(__dirname, 'certificate.pdf');
      await page.pdf({
        path: filePath,
        format: 'A4',
        printBackground: true,
      });

      // Close the browser
      await browser.close();

      // Read the file and send it as a response
      const pdfBuffer = fs.readFileSync(filePath);

      // Set response headers for downloading the PDF
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=certificate.pdf'
      );

      // Send the generated PDF as the response
      res.send(pdfBuffer);

      // Optionally, delete the temporary file after sending the response
      fs.unlinkSync(filePath);
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
