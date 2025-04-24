const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  academy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Academy',
    required: true,
  },
  roadmap: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roadmap',
    required: true,
  },
  from: Date,
  to: Date,
  location: String,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  examDate: Date,

  score: Number,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
