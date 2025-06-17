const Roadmap = require('../models/Roadmap');
const Question = require('../models/Question');

async function decideRoadmap(userAnswers) {
  const questions = await Question.find({});
  const roadmaps = await Roadmap.find({}, '_id title');

  const scores = {};
  roadmaps.forEach(({ title }) => (scores[title] = 0));

  userAnswers.forEach(({ questionId, answer }) => {
    const question = questions.find((q) => q._id.toString() === questionId);
    if (!question) return;

    const selectedAnswer = question.answers.find((a) => a.text === answer);
    if (!selectedAnswer) return;

    selectedAnswer.impacts.forEach(({ roadmap, score }) => {
      const matchingRoadmap = roadmaps.find((r) =>
        r.title.toLowerCase().includes(roadmap.toLowerCase())
      );

      if (matchingRoadmap) {
        scores[matchingRoadmap.title] += score;
      }
    });
  });

  const bestTitle = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0];
  if (!bestTitle || scores[bestTitle] === 0) {
    return { id: null, title: 'General Roadmap' };
  }

  const bestRoadmap = roadmaps.find((r) => r.title === bestTitle);
  return { id: bestRoadmap._id, title: bestRoadmap.title };
}

module.exports = { decideRoadmap };
