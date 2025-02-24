const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.status(200).json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
  })
  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (req, res) => {
  const { title, author, url, likes } = req.body

  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.status(201).json(updatedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = blogsRouter