import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
        <p className="text-gray-600 mb-4">{article.excerpt}</p>
        <Link to={`/article/${article.slug}`} className="text-blue-600 font-medium hover:underline">
          Read More →
        </Link>
      </div>
    </div>
  );
}

export default ArticleCard;
