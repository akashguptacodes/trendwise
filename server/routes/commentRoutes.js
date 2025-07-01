const express = require("express");
const router = express.Router();
const { getCommentsByArticle, postComment } = require("../controllers/commentController");

// GET /api/comments/:articleId
router.get("/:articleId", getCommentsByArticle);

// POST /api/comments/:articleId
router.post("/:articleId", postComment);

module.exports = router;
