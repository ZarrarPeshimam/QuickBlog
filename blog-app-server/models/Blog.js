import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  author: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });


const Blog=mongoose.model('blog',blogSchema);

export  default Blog;