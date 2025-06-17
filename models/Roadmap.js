const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    stagesCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

roadmapSchema.pre('save', async function (next) {
  if (!this.image && this.title) {
    const iconName = this.title
      .toLowerCase()
      .replace(/\+/g, 'plus')
      .replace(/#/g, 'sharp')
      .replace(/\./g, 'dot')
      .replace(/\s+/g, '');

    const url = `https://cdn.simpleicons.org/${iconName}`;

    try {
      const fetch = (await import('node-fetch')).default; // dynamic import here
      const res = await fetch(url);
      if (res.ok) {
        this.image = url;
      } else {
        this.image = 'https://placehold.co/600x400/png';
      }
    } catch (err) {
      console.error('Error fetching icon:', err);
      this.image = 'https://placehold.co/600x400/png';
    }
  }

  next();
});

module.exports = mongoose.model('Roadmap', roadmapSchema);
