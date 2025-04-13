const mongoose = require('mongoose');
const faker = require('faker');
const { Stage, ContentStage, QuizStage } = require('./models/Stage'); // Adjust path as needed
const Roadmap = require('./models/Roadmap'); // Adjust path to your Roadmap model

// Connect to your MongoDB database
mongoose
  .connect(
    'mongodb+srv://clancy:ozML2FWQMRTs8PRb@cluster0.jwgbv6q.mongodb.net/codyssey'
  )
  .then(async () => {
    console.log('Connected to MongoDB');

    // Get a random roadmap (assuming at least one exists in the database)
    const roadmaps = await Roadmap.find();
    if (roadmaps.length === 0) {
      console.error('No roadmaps found in the database!');
      mongoose.disconnect();
      return;
    }
    const randomRoadmap = roadmaps[Math.floor(Math.random() * roadmaps.length)];

    // Create 20 dummy stages (Content and Quiz)
    const stages = [];
    for (let i = 0; i < 20; i++) {
      const isQuizStage = Math.random() > 0.5; // 50% chance for a QuizStage

      const stageData = {
        title: faker.lorem.sentence(),
        number: i + 1,
        description: faker.lorem.paragraph(),
        roadmap: '67fa720f9163f5666f20238e',
        type: isQuizStage ? 'quiz' : 'content',
      };

      if (isQuizStage) {
        // Generate dummy QuizStage data
        stageData.questions = Array.from({ length: 3 }, () => ({
          questionText: faker.lorem.sentence(),
          options: Array.from({ length: 4 }, () => ({
            optionText: faker.lorem.word(),
            isCorrect: Math.random() > 0.5, // Randomly set one correct option
          })),
        }));
        stages.push(QuizStage.create(stageData)); // Create a QuizStage
      } else {
        // Generate dummy ContentStage data
        stageData.videos = Array.from({ length: 2 }, () =>
          faker.internet.url()
        );
        stageData.docs = Array.from({ length: 3 }, () => faker.internet.url());
        stages.push(ContentStage.create(stageData)); // Create a ContentStage
      }
    }

    // Wait for all stages to be created
    await Promise.all(stages);

    console.log('Successfully created 20 dummy stages!');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    mongoose.disconnect();
  });
