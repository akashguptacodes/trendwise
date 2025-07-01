const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: String,
    slug: { type: String, unique: true },
    excerpt: String,
    content: String,
    image: String,
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Article', articleSchema);
