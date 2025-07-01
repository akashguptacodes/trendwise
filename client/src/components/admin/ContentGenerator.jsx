import { useState, useEffect } from "react";
import axios from "axios";

function ContentGenerator() {
  const [topic, setTopic] = useState("");
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch trending topics on load
  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/bot/trending`);
        setTrendingTopics(res.data);
      } catch (err) {
        console.error("Error fetching trends:", err);
      }
    };

    fetchTrends();
  }, []);

  const generateArticle = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setArticle(null);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKENDURL}/api/bot/generate`, { topic });
      setArticle(res?.data?.blog);
    } catch (err) {
      console.error("Bot error:", err);
      alert("Failed to generate article");
    } finally {
      setLoading(false);
    }
  };

  const saveArticle = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKENDURL}/api/articles`, article);
      alert("Article saved successfully!");
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save article.");
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow bg-white mt-6">
      <h2 className="text-lg font-semibold mb-4">Generate Article with Gemini</h2>

      {/* Select from trending or input */}
      <select
        onChange={(e) => setTopic(e.target.value)}
        value={topic}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="">-- Select a trending topic --</option>
        {trendingTopics.map((t, idx) => (
          <option key={idx} value={t}>
            {t}
          </option>
        ))}
      </select>

      <input
        type="text"
        className="w-full p-2 border rounded mb-2"
        placeholder="Or enter your own topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <button
        onClick={generateArticle}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Article"}
      </button>

      {article && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="text-xl font-bold">{article.title}</h3>
          <p className="italic text-gray-600 mb-2">{article.excerpt}</p>
          <img src={article.image} alt="thumbnail" className="rounded mb-4" />
          <div dangerouslySetInnerHTML={{ __html: article.content }} />

          <button
            onClick={saveArticle}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save to Database
          </button>
        </div>
      )}
    </div>
  );
}

export default ContentGenerator;
