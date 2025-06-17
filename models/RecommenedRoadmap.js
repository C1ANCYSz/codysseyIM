const mongoose = require('mongoose');

const recommenedRoadmapSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  roadmaps: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Roadmap',
      required: true,
    },
  ],
});

module.exports = mongoose.model('RecommenedRoadmap', recommenedRoadmapSchema);
