import { useState } from "react";

function CommentSection({ articleId }) {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Akash",
      text: "Amazing article! Very insightful.",
      date: "2025-06-30",
    },
    {
      id: 2,
      name: "John",
      text: "Thanks for the info. Looking forward to more!",
      date: "2025-06-29",
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: comments.length + 1,
      name: "Guest User", // Replace with logged-in user's name later
      text: newComment,
      date: new Date().toISOString().split("T")[0],
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="mt-10 border-t pt-6">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full p-3 border rounded-lg resize-none"
          rows="3"
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Post Comment
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">{comment.name} · {comment.date}</p>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
