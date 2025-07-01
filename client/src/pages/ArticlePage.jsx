import { useParams } from "react-router-dom";
import mockArticles from "../data/mockData";
import ArticleDetail from "../components/article/ArticleDetail";

function ArticlePage() {
  const { slug } = useParams();
  const article = mockArticles.find((item) => item.slug === slug);

  if (!article) {
    return <div className="text-center mt-20 text-xl">Article not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <ArticleDetail article={article} />
    </div>
  );
}

export default ArticlePage;
