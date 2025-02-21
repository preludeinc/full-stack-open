const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (req, res) => {
  Blog.find({}).then(blog => {
    res.json(blog)
  })
})

blogRouter.post('/', (req, res) => {
  const blog = new Blog(req.body)

  blog.save()
    .then((savedBlog) => {
      res.status(201).json(savedBlog)
    })
})

module.exports = blogRouter