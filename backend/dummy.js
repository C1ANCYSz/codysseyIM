const mongoose = require('mongoose');

const Roadmap = require('./models/Roadmap');
const Question = require('./models/Question');
const UserRoadmap = require('./models/UserRoadmap');
const User = require('./models/User');
const Appointment = require('./models/Appointment');

const { ContentStage, QuizStage } = require('./models/Stage');

require('dotenv').config();

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

const questions = [
  {
    question: 'How experienced are you with coding?',
    answers: [
      {
        text: 'Absolute Beginner',
        impacts: [{ roadmap: 'HTML & CSS', score: 5 }],
      },
      {
        text: 'Some Experience',
        impacts: [
          { roadmap: 'Vue.js', score: 4 },
          { roadmap: 'React JS', score: 4 },
          { roadmap: 'Express.js', score: 4 },
        ],
      },
      {
        text: 'Confident Coder',
        impacts: [
          { roadmap: 'MERN Stack', score: 5 },
          { roadmap: 'Django', score: 5 },
          { roadmap: 'MongoDB', score: 5 },
        ],
      },
    ],
  },
  {
    question: "What's your current goal?",
    answers: [
      {
        text: 'Build my first website',
        impacts: [
          { roadmap: 'HTML & CSS', score: 5 },
          { roadmap: 'React JS', score: 5 },
        ],
      },
      {
        text: 'Create full web apps',
        impacts: [
          { roadmap: 'MERN Stack', score: 5 },
          { roadmap: 'Next.js', score: 5 },
        ],
      },
      {
        text: 'Learn backend systems',
        impacts: [
          { roadmap: 'Node.js', score: 5 },
          { roadmap: 'Express.js', score: 5 },
          { roadmap: 'Django', score: 5 },
        ],
      },
      {
        text: 'Explore databases',
        impacts: [{ roadmap: 'MongoDB', score: 5 }],
      },
    ],
  },
  {
    question: "What's your learning vibe?",
    answers: [
      {
        text: 'Visual and interactive',
        impacts: [
          { roadmap: 'Vue.js', score: 5 },
          { roadmap: 'React JS', score: 5 },
        ],
      },
      {
        text: 'Logical and structured',
        impacts: [
          { roadmap: 'Node.js', score: 5 },
          { roadmap: 'Express.js', score: 5 },
        ],
      },
      {
        text: 'Curious about how computers work',
        impacts: [{ roadmap: 'assembly', score: 5 }],
      },
      {
        text: 'Love seeing fast results',
        impacts: [
          { roadmap: 'HTML & CSS', score: 5 },
          { roadmap: 'Next.js', score: 5 },
        ],
      },
    ],
  },
  {
    question: 'How do you prefer learning?',
    answers: [
      {
        text: 'Quick wins first, then deeper',
        impacts: [
          { roadmap: 'HTML & CSS', score: 5 },
          { roadmap: 'Vue.js', score: 4 },
        ],
      },
      {
        text: 'Deep dive from Day 1',
        impacts: [
          { roadmap: 'Node.js', score: 5 },
          { roadmap: 'Django', score: 5 },
          { roadmap: 'MongoDB', score: 5 },
        ],
      },
    ],
  },
  {
    question: 'Which of these sounds like your dream job?',
    answers: [
      {
        text: 'Frontend Developer',
        impacts: [
          { roadmap: 'React JS', score: 5 },
          { roadmap: 'Vue.js', score: 5 },
          { roadmap: 'TypeScript', score: 5 },
          { roadmap: 'Next.js', score: 5 },
        ],
      },
      {
        text: 'Backend Developer',
        impacts: [
          { roadmap: 'Node.js', score: 5 },
          { roadmap: 'Express.js', score: 5 },
          { roadmap: 'Django', score: 5 },
        ],
      },
      {
        text: 'Fullstack Developer',
        impacts: [
          { roadmap: 'MERN Stack', score: 5 },
          { roadmap: 'Next.js', score: 5 },
        ],
      },
      {
        text: 'Database Administrator',
        impacts: [{ roadmap: 'MongoDB', score: 5 }],
      },
    ],
  },
  {
    question: 'What type of projects would you love to build first?',
    answers: [
      {
        text: 'Beautiful websites and apps',
        impacts: [
          { roadmap: 'React JS', score: 5 },
          { roadmap: 'Vue.js', score: 5 },
          { roadmap: 'HTML & CSS', score: 5 },
          { roadmap: 'Next.js', score: 4 },
        ],
      },
      {
        text: 'Backend systems and APIs',
        impacts: [
          { roadmap: 'Node.js', score: 5 },
          { roadmap: 'Express.js', score: 5 },
          { roadmap: 'Django', score: 5 },
        ],
      },
      {
        text: 'Full applications from scratch',
        impacts: [
          { roadmap: 'MERN Stack', score: 5 },
          { roadmap: 'Next.js', score: 5 },
        ],
      },
      {
        text: 'Powerful databases',
        impacts: [{ roadmap: 'MongoDB', score: 5 }],
      },
      {
        text: 'Low-level software',
        impacts: [{ roadmap: 'assembly', score: 5 }],
      },
    ],
  },
  {
    question: 'Which topic do you find more exciting?',
    answers: [
      {
        text: 'UI/UX and animations',
        impacts: [
          { roadmap: 'React JS', score: 5 },
          { roadmap: 'Vue.js', score: 5 },
        ],
      },
      {
        text: 'Data handling and APIs',
        impacts: [
          { roadmap: 'Node.js', score: 5 },
          { roadmap: 'Express.js', score: 5 },
          { roadmap: 'MongoDB', score: 5 },
        ],
      },
      {
        text: 'Security, auth, scaling',
        impacts: [
          { roadmap: 'Django', score: 5 },
          { roadmap: 'MERN Stack', score: 5 },
        ],
      },
    ],
  },
  {
    question: "What's more important for you?",
    answers: [
      {
        text: 'Frontend looks and feels',
        impacts: [
          { roadmap: 'Vue.js', score: 5 },
          { roadmap: 'React JS', score: 5 },
          { roadmap: 'TypeScript', score: 4 },
        ],
      },
      {
        text: 'Backend logic and power',
        impacts: [
          { roadmap: 'Node.js', score: 5 },
          { roadmap: 'Express.js', score: 5 },
          { roadmap: 'Django', score: 5 },
        ],
      },
      {
        text: 'Full package, both frontend and backend',
        impacts: [
          { roadmap: 'MERN Stack', score: 5 },
          { roadmap: 'Next.js', score: 5 },
        ],
      },
    ],
  },
  {
    question: 'Which tech would you LOVE to master first?',
    answers: [
      {
        text: 'React.js',
        impacts: [
          { roadmap: 'React JS', score: 5 },
          { roadmap: 'MERN Stack', score: 3 },
          { roadmap: 'Next.js', score: 4 },
        ],
      },
      {
        text: 'Node.js',
        impacts: [
          { roadmap: 'Node.js', score: 5 },
          { roadmap: 'Express.js', score: 5 },
        ],
      },
      {
        text: 'TypeScript',
        impacts: [
          { roadmap: 'TypeScript', score: 5 },
          { roadmap: 'Next.js', score: 4 },
        ],
      },
      { text: 'Vue.js', impacts: [{ roadmap: 'Vue.js', score: 5 }] },
      { text: 'Django', impacts: [{ roadmap: 'django', score: 5 }] },
    ],
  },
  {
    question: 'Pick your future tech stack:',
    answers: [
      {
        text: 'MERN (MongoDB, Express, React, Node)',
        impacts: [
          { roadmap: 'MERN Stack', score: 5 },
          { roadmap: 'MongoDB', score: 4 },
          { roadmap: 'Node.js', score: 4 },
          { roadmap: 'React JS', score: 4 },
        ],
      },
      {
        text: 'React + Next.js',
        impacts: [
          { roadmap: 'React JS', score: 5 },
          { roadmap: 'Next.js', score: 5 },
        ],
      },
      {
        text: 'Vue.js + Node.js',
        impacts: [
          { roadmap: 'Vue.js', score: 5 },
          { roadmap: 'Node.js', score: 4 },
          { roadmap: 'Express.js', score: 4 },
        ],
      },
      {
        text: 'Django + Database',
        impacts: [
          { roadmap: 'django', score: 5 },
          { roadmap: 'MongoDB', score: 4 },
        ],
      },
    ],
  },
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

const addTimeStamps = async () => {
  const appointments = await Appointment.find();

  for (const appointment of appointments) {
    appointment.createdAt = new Date();
    appointment.updatedAt = new Date();
    await appointment.save();
  }

  console.log('✅ Done adding timestamps!');
  mongoose.connection.close();
};

async function findInvalidUserRoadmaps() {
  try {
    const userRoadmaps = await UserRoadmap.find();

    const invalidUserRoadmaps = [];

    for (const userRoadmap of userRoadmaps) {
      const roadmapExists = await Roadmap.exists({ _id: userRoadmap.roadmap });

      if (!roadmapExists) {
        invalidUserRoadmaps.push(userRoadmap);
        await UserRoadmap.findByIdAndDelete(userRoadmap._id);
      }
    }

    console.log(`Found ${invalidUserRoadmaps.length} invalid UserRoadmaps:`);

    invalidUserRoadmaps.forEach((doc) => {
      console.log(
        `UserRoadmap ID: ${doc._id}, Missing Roadmap ID: ${doc.roadmap}`
      );
    });

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
    await mongoose.disconnect();
  }
}

async function seed() {
  try {
    await Question.deleteMany();
    await Question.insertMany(questions);

    console.log('🎉 Questions seeded successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding questions:', error);
    process.exit(1);
  }
}

//findInvalidUserRoadmaps();

//seedStages();

//updateQuizzes();

//updateQuizzesAnswer();

//createDummyUsers();

//addTimeStamps();

// seedQuestions.js

//seed();
