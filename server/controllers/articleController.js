const Article = require("../models/Article");
const generateSlug = require("../utils/generateSlug");

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) return res.status(404).json({ message: "Not found" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createArticle = async (req, res) => {
  const { title, excerpt, content, image } = req.body;
  const slug = generateSlug(title);

  try {
    const newArticle = new Article({
      title,
      slug,
      excerpt,
      content,
      image,
    });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(500).json({ message: "Could not create article" });
  }
};
