const express = require("express");
const router = express.Router();
const {
  getAllArticles,
  getArticleBySlug,
  createArticle,
} = require("../controllers/articleController");

router.get("/", getAllArticles);
router.get("/:slug", getArticleBySlug);
router.post("/", createArticle); // in production: secure with auth

module.exports = router;
