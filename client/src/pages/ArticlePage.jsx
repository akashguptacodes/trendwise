import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArticleDetail from "../components/article/ArticleDetail";

function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_KEY;

  const fetchImage = async (query) => {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=1&client_id=${UNSPLASH_API_KEY}`
      );
      const data = await res.json();
      return data?.results?.[0]?.urls?.regular || "";
    } catch (err) {
      console.error("Image fetch error:", err);
      return "";
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/articles/${slug}`);
        const imageUrl = await fetchImage(slug);
        setArticle({ ...res.data, image: imageUrl });
      } catch (err) {
        console.error("Article fetch error:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return <div className="text-center mt-20 text-gray-500">Loading article...</div>;
  }

  if (notFound || !article) {
    return <div className="text-center mt-20 text-xl text-red-500">Article not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <ArticleDetail article={article} />
    </div>
  );
}

export default ArticlePage;
