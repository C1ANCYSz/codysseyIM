const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');

const globalErrorHandler = require('./middlewares/globalErrorHandler');
const authRouter = require('./routes/authRouter');
const roadmapsRouter = require('./routes/roadmapsRouter');
const studentRouter = require('./routes/studentRouter');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173', // React app URL (use your actual React app URL in production)
    credentials: true, // This allows cookies to be sent
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

app.use('*', (req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use(globalErrorHandler);

module.exports = app;
