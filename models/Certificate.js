const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  roadmap: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roadmap',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Certificate', certificateSchema);
