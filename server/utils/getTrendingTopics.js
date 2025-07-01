const axios = require("axios");

async function getTrendingTopics() {
  const API_KEY = process.env.GNEWS_API_KEY;

  try {
    const response = await axios.get(
      `https://gnews.io/api/v4/top-headlines?lang=en&country=in&max=10&apikey=${API_KEY}`
    );

    const articles = response.data.articles || [];
    const topics = articles.map((a) => a.title);
    return topics;
  } catch (err) {
    console.error("GNews Error:", err.message);
    return [];
  }
}

module.exports = getTrendingTopics;