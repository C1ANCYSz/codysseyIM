const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
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
  stage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stage',
    required: true,
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
});
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
