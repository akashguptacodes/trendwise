const Comment = require("../models/Comment");

exports.getCommentsByArticle = async (req, res) => {
  try {
    const comments = await Comment.find({ articleId: req.params.articleId }).sort({ date: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};

exports.postComment = async (req, res) => {
  const { name, text } = req.body;
  const { articleId } = req.params;

  try {
    const comment = new Comment({
      articleId,
      name,
      text,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Failed to post comment" });
  }
};
