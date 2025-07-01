const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
  name: String,
  text: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);
