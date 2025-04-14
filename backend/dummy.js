const mongoose = require('mongoose');
const { Stage, ContentStage, QuizStage } = require('./models/Stage');
const Roadmap = require('./models/Roadmap'); // Adjust if needed
require('dotenv').config();
const { MONGO_URI } = process.env;
mongoose.connect(MONGO_URI);

const getRandomContent = () => ({
  videos: [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://www.youtube.com/watch?v=3fumBcKC6RE',
  ],
  docs: ['https://developer.mozilla.org', 'https://w3schools.com'],
});

const getRandomQuiz = () => ({
  questions: [
    {
      questionText: 'What is React?',
      options: [
        { optionText: 'Library', isCorrect: true },
        { optionText: 'Language', isCorrect: false },
        { optionText: 'Database', isCorrect: false },
        { optionText: 'Framework', isCorrect: false },
      ],
    },
    {
      questionText: 'What does HTML stand for?',
      options: [
        { optionText: 'HyperText Markup Language', isCorrect: true },
        { optionText: 'HighText Machine Language', isCorrect: false },
        { optionText: 'Hyperlinks Text Markup Language', isCorrect: false },
        { optionText: 'None of the above', isCorrect: false },
      ],
    },
  ],
  score: 10,
});

const seedStages = async () => {
  try {
    const roadmaps = await Roadmap.find().limit(10);

    if (roadmaps.length < 10) {
      console.log('Need at least 10 roadmaps to seed.');
      return;
    }

    for (const roadmap of roadmaps) {
      console.log(`Seeding stages for roadmap: ${roadmap.title}`);

      for (let i = 1; i <= 20; i++) {
        const isQuiz = i % 5 === 0; // every 5th stage is a quiz

        const baseData = {
          title: isQuiz ? `Quiz Stage ${i}` : `Content Stage ${i}`,
          number: i,
          description: isQuiz
            ? 'Test your knowledge with this quiz'
            : 'Learn the topic through videos and docs',
          roadmap: roadmap._id,
        };

        if (isQuiz) {
          await QuizStage.create({
            ...baseData,
            ...getRandomQuiz(),
            type: 'quiz',
          });
        } else {
          await ContentStage.create({
            ...baseData,
            ...getRandomContent(),
            type: 'content',
          });
        }
      }
    }

    console.log('✅ Done seeding stages!');
    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error seeding stages:', err);
    mongoose.connection.close();
  }
};

seedStages();
