const mongoose = require("mongoose");

//schema  and model
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  image: String,
});
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
