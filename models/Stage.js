const mongoose = require("mongoose");

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
      ref: "Roadmap",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["content", "quiz"],
    },
  },
  {
    timestamps: true,
    discriminatorKey: "type",
  }
);

const Stage = mongoose.model("Stage", baseStageSchema);

const contentStageSchema = new mongoose.Schema({
  videos: [{ url: String, title: String }],
  docs: [{ url: String, title: String }],
});

const ContentStage = Stage.discriminator("content", contentStageSchema);

const quizStageSchema = new mongoose.Schema({
  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },
      options: [
        {
          answer: {
            type: String,
          },
          isCorrect: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
  ],
  questionsCount: {
    type: Number,
    required: false,
  },
});

const QuizStage = Stage.discriminator("quiz", quizStageSchema);

module.exports = {
  Stage,
  ContentStage,
  QuizStage,
};
