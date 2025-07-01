const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const articleRoutes = require('./routes/articleRoutes');
const commentRoutes = require('./routes/commentRoutes');
const botRoutes = require('./routes/botRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const connectDB = require('./config/db');
connectDB();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/articles', articleRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/bot', botRoutes);

// SEO files
app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send("User-agent: *\nDisallow: /admin\nSitemap: https://trendwise.vercel.app/sitemap.xml");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
