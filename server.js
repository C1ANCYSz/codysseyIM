const app = require('./app');
require('dotenv').config();
const mongoose = require('mongoose');

const DB = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION...Shutting down.');
  console.error(err.message);
  process.exit(0);
});

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.error('DB connection error:', err.message);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.error('UNHANDLED REJECTION. Shutting down.....');
  server.close(() => {
    process.exit(1);
  });
});
