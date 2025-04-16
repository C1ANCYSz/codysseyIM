const mongoose = require('mongoose');
const { ContentStage } = require('./models/Stage');
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

seedStages();
