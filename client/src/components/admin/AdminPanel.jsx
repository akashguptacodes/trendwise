import ContentGenerator from "./ContentGenerator";
import ArticleManager from "./ArticleManager";

function AdminPanel({ user }) {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-blue-700">Admin Dashboard</h1>
      <p className="text-gray-600">Welcome, {user.name}</p>

      {/* Generate content using Gemini */}
      <ContentGenerator />

      {/* Show saved articles */}
      <ArticleManager />
    </div>
  );
}

export default AdminPanel;
