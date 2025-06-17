const mongoose = require('mongoose');

const userRoadmapSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    roadmap: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Roadmap',
      required: true,
    },
    completedStages: {
      type: Number,
      default: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('UserRoadmap', userRoadmapSchema);
