import { useEffect, useState } from "react";
import ArticleList from "../components/article/ArticleList";
import useSearch from "../hooks/useSearch";
import mockArticles from "../data/mockData"; // Replace this with API later
import axios from "axios";

function HomePage() {
  const {
    searchQuery,
    handleSearch,
    filteredArticles,
    setSearchQuery,
  } = useSearch(mockArticles);

  const [trending, setTrending] = useState([]);

  // Fetch trending topics
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/bot/trending`);
        setTrending(res?.data);
      } catch (err) {
        console.error("Trending fetch error:", err);
      }
    };

    fetchTrending();
    handleSearch(""); // Reset search on load
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* 🧠 Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          TrendWise
        </h1>
        <p className="text-gray-600 text-lg">Stay updated with AI-generated blogs on trending topics.</p>
      </div>

      {/* 🔥 Trending Topics */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">🔥 Trending Topics</h2>
        {trending.length === 0 ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : (
          <ul className="flex flex-wrap gap-3">
            {Array.isArray(trending) &&
              trending.map((topic, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setSearchQuery(topic);
                    handleSearch(topic);
                  }}
                  className="cursor-pointer bg-blue-100 hover:bg-blue-200 px-4 py-1.5 rounded-full text-sm text-blue-800 font-medium transition-shadow shadow-sm hover:shadow-md"
                >
                  {topic}
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search articles..."
          className="w-full max-w-lg p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* 📰 Article List */}
      <ArticleList articles={filteredArticles} />
    </div>
  );
}

export default HomePage;
