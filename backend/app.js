const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const morgan = require('morgan');

const globalErrorHandler = require('./middlewares/globalErrorHandler');
const authRouter = require('./routes/authRouter');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

app.use('/api/auth', authRouter);

app.use('*', (req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use(globalErrorHandler);

module.exports = app;
