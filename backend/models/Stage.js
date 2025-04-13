const mongoose = require('mongoose');

const baseStageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    roadmap: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Roadmap',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['content', 'quiz'],
    },
  },
  {
    timestamps: true,
    discriminatorKey: 'type',
  }
);

const Stage = mongoose.model('Stage', baseStageSchema);

const contentStageSchema = new mongoose.Schema({
  videos: [String],
  docs: [String],
});

const ContentStage = Stage.discriminator('content', contentStageSchema);

const quizStageSchema = new mongoose.Schema({
  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },
      options: [
        {
          optionText: {
            type: String,
            required: true,
          },
          isCorrect: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
  ],
  score: {
    type: Number,
    required: true,
  },
});

const QuizStage = Stage.discriminator('quiz', quizStageSchema);

module.exports = {
  Stage,
  ContentStage,
  QuizStage,
};
