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
        impacts: [
          { roadmap: 'HTML & CSS', score: 5 },
          { roadmap: 'Javascript', score: 3 },
        ],
      },
      {
        text: 'Some Experience',
        impacts: [
          { roadmap: 'Vue.js', score: 4 },
          { roadmap: 'React JS', score: 4 },
          { roadmap: 'Python', score: 4 },
        ],
      },
      {
        text: 'Confident Coder',
        impacts: [
          { roadmap: 'MERN Stack', score: 5 },
          { roadmap: 'Node.js', score: 5 },
          { roadmap: 'Data structures & Algorithms', score: 5 },
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
          { roadmap: 'Javascript', score: 4 },
          { roadmap: 'Tailwind CSS', score: 4 },
        ],
      },
      {
        text: 'Create full web applications',
        impacts: [
          { roadmap: 'MERN Stack', score: 5 },
          { roadmap: 'Next.js', score: 5 },
          { roadmap: 'React JS', score: 4 },
        ],
      },
      {
        text: 'Develop mobile apps',
        impacts: [
          { roadmap: 'React Native', score: 5 },
          { roadmap: 'Flutter', score: 5 },
        ],
      },
      {
        text: 'Work with data and databases',
        impacts: [
          { roadmap: 'MongoDB', score: 5 },
          { roadmap: 'PostgreSQL', score: 5 },
          { roadmap: 'Data Analysis', score: 4 },
        ],
      },
    ],
  },
  {
    question: "What's your learning style?",
    answers: [
      {
        text: 'Visual and interactive',
        impacts: [
          { roadmap: 'Vue.js', score: 5 },
          { roadmap: 'React JS', score: 5 },
          { roadmap: 'HTML & CSS', score: 4 },
        ],
      },
      {
        text: 'Logical and structured',
        impacts: [
          { roadmap: 'Node.js', score: 5 },
          { roadmap: 'Express.js', score: 5 },
          { roadmap: 'Data structures & Algorithms', score: 5 },
        ],
      },
      {
        text: 'Practical and hands-on',
        impacts: [
          { roadmap: 'Git & GitHub', score: 5 },
          { roadmap: 'Python', score: 5 },
        ],
      },
    ],
  },
  {
    question: 'Which of these excites you most?',
    answers: [
      {
        text: 'Building beautiful user interfaces',
        impacts: [
          { roadmap: 'React JS', score: 5 },
          { roadmap: 'Vue.js', score: 5 },
          { roadmap: 'Tailwind CSS', score: 5 },
        ],
      },
      {
        text: 'Creating powerful backend systems',
        impacts: [
          { roadmap: 'Node.js', score: 5 },
          { roadmap: 'Express.js', score: 5 },
          { roadmap: 'PostgreSQL', score: 4 },
        ],
      },
      {
        text: 'Developing mobile applications',
        impacts: [
          { roadmap: 'React Native', score: 5 },
          { roadmap: 'Flutter', score: 5 },
        ],
      },
      {
        text: 'Working with data and AI',
        impacts: [
          { roadmap: 'Machine Learning Basics', score: 5 },
          { roadmap: 'Data Analysis', score: 5 },
        ],
      },
    ],
  },
  {
    question: 'Which tech role interests you most?',
    answers: [
      {
        text: 'Frontend Developer',
        impacts: [
          { roadmap: 'React JS', score: 5 },
          { roadmap: 'Vue.js', score: 5 },
          { roadmap: 'Next.js', score: 4 },
          { roadmap: 'Tailwind CSS', score: 4 },
        ],
      },
      {
        text: 'Backend Developer',
        impacts: [
          { roadmap: 'Node.js', score: 5 },
          { roadmap: 'Express.js', score: 5 },
          { roadmap: 'PostgreSQL', score: 4 },
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
        text: 'Mobile Developer',
        impacts: [
          { roadmap: 'React Native', score: 5 },
          { roadmap: 'Flutter', score: 5 },
        ],
      },
      {
        text: 'Data Specialist',
        impacts: [
          { roadmap: 'Data Analysis', score: 5 },
          { roadmap: 'Machine Learning Basics', score: 5 },
        ],
      },
    ],
  },
  {
    question: 'What type of projects excite you?',
    answers: [
      {
        text: 'Websites and web apps',
        impacts: [
          { roadmap: 'React JS', score: 5 },
          { roadmap: 'Vue.js', score: 5 },
          { roadmap: 'Next.js', score: 5 },
        ],
      },
      {
        text: 'Mobile applications',
        impacts: [
          { roadmap: 'React Native', score: 5 },
          { roadmap: 'Flutter', score: 5 },
        ],
      },
      {
        text: 'APIs and backend services',
        impacts: [
          { roadmap: 'Node.js', score: 5 },
          { roadmap: 'Express.js', score: 5 },
        ],
      },
      {
        text: 'Data analysis and visualization',
        impacts: [
          { roadmap: 'Data Analysis', score: 5 },
          { roadmap: 'Python', score: 4 },
        ],
      },
    ],
  },
  {
    question: 'How do you prefer to learn?',
    answers: [
      {
        text: 'Quick wins and visible results',
        impacts: [
          { roadmap: 'HTML & CSS', score: 5 },
          { roadmap: 'Javascript', score: 4 },
          { roadmap: 'Tailwind CSS', score: 4 },
        ],
      },
      {
        text: 'Structured, step-by-step',
        impacts: [
          { roadmap: 'Data structures & Algorithms', score: 5 },
          { roadmap: 'Git & GitHub', score: 5 },
        ],
      },
      {
        text: 'Building real projects',
        impacts: [
          { roadmap: 'MERN Stack', score: 5 },
          { roadmap: 'React Native', score: 5 },
        ],
      },
    ],
  },
  {
    question: 'Which of these sounds most appealing?',
    answers: [
      {
        text: 'Creating responsive UIs',
        impacts: [
          { roadmap: 'React JS', score: 5 },
          { roadmap: 'Vue.js', score: 5 },
          { roadmap: 'Tailwind CSS', score: 5 },
        ],
      },
      {
        text: 'Building scalable backends',
        impacts: [
          { roadmap: 'Node.js', score: 5 },
          { roadmap: 'Express.js', score: 5 },
          { roadmap: 'PostgreSQL', score: 4 },
        ],
      },
      {
        text: 'Developing cross-platform apps',
        impacts: [
          { roadmap: 'React Native', score: 5 },
          { roadmap: 'Flutter', score: 5 },
        ],
      },
      {
        text: 'Working with data and patterns',
        impacts: [
          { roadmap: 'Data Analysis', score: 5 },
          { roadmap: 'Machine Learning Basics', score: 5 },
        ],
      },
    ],
  },
  {
    question: 'Pick your preferred tech stack:',
    answers: [
      {
        text: 'JavaScript/TypeScript ecosystem',
        impacts: [
          { roadmap: 'React JS', score: 5 },
          { roadmap: 'Node.js', score: 4 },
          { roadmap: 'MERN Stack', score: 4 },
        ],
      },
      {
        text: 'Python ecosystem',
        impacts: [
          { roadmap: 'Python', score: 5 },
          { roadmap: 'Data Analysis', score: 4 },
          { roadmap: 'Machine Learning Basics', score: 4 },
        ],
      },
      {
        text: 'Mobile development',
        impacts: [
          { roadmap: 'React Native', score: 5 },
          { roadmap: 'Flutter', score: 5 },
        ],
      },
      {
        text: 'Databases and data',
        impacts: [
          { roadmap: 'MongoDB', score: 5 },
          { roadmap: 'PostgreSQL', score: 5 },
        ],
      },
    ],
  },
  {
    question: 'Which fundamental skill do you want to strengthen?',
    answers: [
      {
        text: 'Programming concepts',
        impacts: [
          { roadmap: 'Javascript', score: 5 },
          { roadmap: 'Python', score: 5 },
        ],
      },
      {
        text: 'Algorithms and problem solving',
        impacts: [{ roadmap: 'Data structures & Algorithms', score: 5 }],
      },
      {
        text: 'Version control and collaboration',
        impacts: [{ roadmap: 'Git & GitHub', score: 5 }],
      },
      {
        text: 'Web fundamentals',
        impacts: [
          { roadmap: 'HTML & CSS', score: 5 },
          { roadmap: 'Javascript', score: 4 },
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
