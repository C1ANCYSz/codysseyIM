const mongoose = require('mongoose');
const { ContentStage, QuizStage } = require('./models/Stage');
require('dotenv').config();
const User = require('./models/User');

const { MONGO_URI } = process.env;
mongoose.connect(MONGO_URI);

const videoPool = [
  {
    url: 'https://www.youtube.com/watch?v=XFkzRNyygfk',
    title: 'Radiohead - Creep',
  },
  {
    url: 'https://www.youtube.com/watch?v=3M_Gg1xAHE4',
    title: 'Radiohead - Pyramid Song',
  },
  {
    url: 'https://www.youtube.com/watch?v=yI2oS2hoL0k',
    title: 'Radiohead - Burn the Witch',
  },
  {
    url: 'https://www.youtube.com/watch?v=7qFfFVSerQo',
    title: 'Radiohead - High and Dry',
  },
  {
    url: 'https://www.youtube.com/watch?v=Lt8AfIeJOxw',
    title: 'Radiohead - Paranoid Android',
  },
  {
    url: 'https://www.youtube.com/watch?v=pcEJyvv6_kc',
    title: 'Radiohead - Weird Fishes/Arpeggi (Live)',
  },
  {
    url: 'https://www.youtube.com/watch?v=onRk0sjSgFU',
    title: 'Radiohead - Everything In Its Right Place',
  },
];

const docPool = [
  {
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    title: 'MDN - JavaScript',
  },
  {
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    title: 'MDN - CSS',
  },
  { url: 'https://reactjs.org/docs/getting-started.html', title: 'React Docs' },
  { url: 'https://nextjs.org/docs', title: 'Next.js Docs' },
  {
    url: 'https://expressjs.com/en/starter/installing.html',
    title: 'Express.js Docs',
  },
  { url: 'https://tailwindcss.com/docs', title: 'Tailwind CSS Docs' },
  { url: 'https://nodejs.org/en/docs', title: 'Node.js Docs' },
  { url: 'https://webpack.js.org/concepts/', title: 'Webpack Docs' },
  { url: 'https://vitejs.dev/guide/', title: 'Vite Guide' },
  { url: 'https://html.spec.whatwg.org/', title: 'HTML Living Standard' },
];

const getRandomItems = (arr, maxCount) => {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * maxCount) + 1;
  return shuffled.slice(0, count);
};
const seedStages = async () => {
  try {
    const contentStages = await ContentStage.find();

    for (const stage of contentStages) {
      const videos = getRandomItems(videoPool, videoPool.length);
      const docs = getRandomItems(docPool, docPool.length);
      stage.videos = videos;
      stage.docs = docs;
      await stage.save();
    }

    console.log('✅ Done seeding content stages!');
    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error seeding content stages:', err);
    mongoose.connection.close();
  }
};

const updateQuizzes = async () => {
  try {
    const quizzes = await QuizStage.find();
    for (const quiz of quizzes) {
      quiz.questionsCount = quiz.questions.length;
      score = undefined;
      await quiz.save();
    }
    console.log('✅ Done updating quizzes!');
  } catch (err) {
    console.error('❌ Error updating quizzes:', err);
  }
};

const questionPool = [
  {
    questionText: 'What does HTML stand for?',
    options: [
      { isCorrect: true, answer: 'HyperText Markup Language' },
      { isCorrect: false, answer: 'HighText Machine Language' },
      { isCorrect: false, answer: 'Hyperloop Machine Language' },
      { isCorrect: false, answer: 'HyperText Markdown Language' },
    ],
  },
  {
    questionText: 'Which tag is used to create a hyperlink in HTML?',
    options: [
      { isCorrect: true, answer: '<a>' },
      { isCorrect: false, answer: '<link>' },
      { isCorrect: false, answer: '<href>' },
      { isCorrect: false, answer: '<hyperlink>' },
    ],
  },
  {
    questionText: 'Which property in CSS is used to change text color?',
    options: [
      { isCorrect: true, answer: 'color' },
      { isCorrect: false, answer: 'text-color' },
      { isCorrect: false, answer: 'font-color' },
      { isCorrect: false, answer: 'foreground' },
    ],
  },
  {
    questionText: 'What is the default display value of a <div> element?',
    options: [
      { isCorrect: true, answer: 'block' },
      { isCorrect: false, answer: 'inline' },
      { isCorrect: false, answer: 'flex' },
      { isCorrect: false, answer: 'grid' },
    ],
  },
  {
    questionText: 'Which HTTP method is used to update a resource?',
    options: [
      { isCorrect: true, answer: 'PUT' },
      { isCorrect: false, answer: 'GET' },
      { isCorrect: false, answer: 'POST' },
      { isCorrect: false, answer: 'DELETE' },
    ],
  },
];

const updateQuizzesAnswer = async () => {
  try {
    const quizzes = await QuizStage.find();

    for (const quiz of quizzes) {
      quiz.questions = questionPool.map((q) => ({
        questionText: q.questionText,
        options: q.options.map((opt) => ({
          answer: opt.answer,
          isCorrect: opt.isCorrect,
        })),
      }));

      quiz.questionsCount = questionPool.length;

      await quiz.save();
    }

    console.log('✅ All quizzes updated with web dev questions!');
  } catch (err) {
    console.error('❌ Error updating quizzes:', err);
  }
};

const createDummyUsers = async () => {
  for (let i = 0; i < 10; i++) {
    const newUser = new User({
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      password: 'password123',
      role: 'student',
      confirmPassword: 'password123',
      isVerified: true,
    });
    await newUser.save();
  }
  console.log('✅ Done creating dummy users!');
  mongoose.connection.close();
};
//seedStages();

//updateQuizzes();

//updateQuizzesAnswer();

createDummyUsers();
