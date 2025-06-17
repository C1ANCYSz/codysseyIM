const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const globalErrorHandler = require('./middlewares/globalErrorHandler');
const authRouter = require('./routes/authRouter');
const roadmapsRouter = require('./routes/roadmapsRouter');
const studentRouter = require('./routes/studentRouter');
const adminRouter = require('./routes/adminRouter');
const contentManagerRouter = require('./routes/contentManagerRouter');
const userRouter = require('./routes/userRouter');
const academyRouter = require('./routes/academyRouter');

const app = express();

// CORS Configuration
const allowedOrigins = [process.env.CORS_ORIGIN];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files (public folder, e.g., images)
app.use(express.static('public'));

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/roadmaps', roadmapsRouter);
app.use('/api/student', studentRouter);
app.use('/api/admin', adminRouter);
app.use('/api/content-manager', contentManagerRouter);
app.use('/api/user', userRouter);
app.use('/api/academy', academyRouter);

// Serve frontend from React build
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all: Serve index.html for frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Error Handlers
app.use(globalErrorHandler);

module.exports = app;
