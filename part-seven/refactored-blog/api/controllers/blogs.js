const blogsRouter = require("express").Router();
const blog = require("../models/blog");
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.status(200).json(blogs);
});

blogsRouter.post("/", userExtractor, async (req, res) => {
  const { user } = req;
  const { title, author, url, likes } = req.body;

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    user: user,
    likes: likes,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save({ validateModifiedOnly: true });

  res.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (req, res) => {
  const { title, author, url, likes } = req.body;

  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.status(201).json(updatedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (req, res) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({ error: "token invalid" });
  }

  const blog = await Blog.findById(req.params.id);

  if (blog.user.toString() !== user._id.toString()) {
    return res.status(401).json({ error: "unauthorized access" });
  } else {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  }
});

module.exports = blogsRouter;
