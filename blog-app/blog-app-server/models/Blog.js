import mongoose from "mongoose";

console.log("🧩 Loading Blog model...");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

console.log("🧩 [Blog.js] Mongoose connected to:", mongoose.connection.name);

console.log("📂 Blog model export complete");


export default Blog;
