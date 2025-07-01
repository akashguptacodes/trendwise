// botRoutes.js
const express = require('express');
const { botCont } = require('../controllers/botController');
const getTrendingTopics = require('../utils/getTrendingTopics');
const router = express.Router();

router.post('/generate', botCont);
router.get("/trending", async (req, res) => {
  const topics = await getTrendingTopics();
  res.json(topics);
});

module.exports = router;
