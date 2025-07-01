import { useEffect, useState } from "react";
import axios from "axios";

function ArticleManager() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/articles`);
      setArticles(res.data);
    } catch (err) {
      console.error("Failed to fetch articles", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="mt-6 border rounded-lg bg-white shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Saved Articles</h2>

      {loading ? (
        <p>Loading...</p>
      ) : articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <ul className="space-y-3">
          {articles.map((article) => (
            <li key={article._id} className="border-b pb-2">
              <h3 className="font-bold">{article.title}</h3>
              <p className="text-sm text-gray-600">{article.excerpt}</p>
              <span className="text-xs text-gray-400">{new Date(article.date).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ArticleManager;
