const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');

const globalErrorHandler = require('./middlewares/globalErrorHandler');
const authRouter = require('./routes/authRouter');
const roadmapsRouter = require('./routes/roadmapsRouter');
const studentRouter = require('./routes/studentRouter');
const adminRouter = require('./routes/adminRouter');
const contentManagerRouter = require('./routes/contentManagerRouter');
const userRouter = require('./routes/userRouter');
const academyRouter = require('./routes/academyRouter');
const app = express();

app.use(
  cors({
    //
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/roadmaps', roadmapsRouter);
app.use('/api/student', studentRouter);
app.use('/api/admin', adminRouter);
app.use('/api/content-manager', contentManagerRouter);
app.use('/api/user', userRouter);
app.use('/api/academy', academyRouter);

app.use('*', (req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use(globalErrorHandler);

module.exports = app;
