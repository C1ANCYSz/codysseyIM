const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answers: [
      {
        text: { type: String, required: true },
        impacts: [
          {
            roadmap: { type: String, required: true },
            score: { type: Number, required: true },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Question', questionSchema);
