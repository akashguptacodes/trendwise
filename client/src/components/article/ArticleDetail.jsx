import CommentSection from "./CommentSection";

function ArticleDetail({ article }) {
  return (
    <div className="prose max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{new Date(article.date).toDateString()}</p>
      <img src={article.image} alt={article.title} className="mb-4 w-full rounded-lg" />
      <p>{article.content}</p>

      {/* Add comment section */}
      <CommentSection articleId={article.id} />
    </div>
  );
}

export default ArticleDetail;
