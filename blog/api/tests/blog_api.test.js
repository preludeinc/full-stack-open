const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../utils/test_helper')

const api = supertest(app)

beforeEach(async () => {  
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blog entries are returned as json', async() => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async() => {
  const response = await api
    .get('/api/blogs')
  
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique id property is named id', async() => {
  const response = await api.get('/api/blogs')
  const idCheck = response.body.some(blog => 'id' in blog)

  assert.strictEqual(idCheck, true)
})

describe('deletion of a blog entry', () => {
  test('succeeds with status code 204 if id is valid', async() => {
    const results = await api.get('/api/blogs')
    const blogToDelete = results.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const returnedBlogs = await api.get('/api/blogs')
    const blogInfo = await returnedBlogs.body

    assert.strictEqual(blogInfo.length, helper.initialBlogs.length - 1)
    const contents = blogInfo.map(b => b.title)
    assert(!contents.includes(blogToDelete))
  })
})

describe('updating number of likes for a blog entry', () => {
  test('succeeds with status code 201 if id is valid', async() => {
    const results = await api.get('/api/blogs')
    const blogToUpdate = results.body[0]

    const blog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: Number(blogToUpdate.likes * 10)
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blog)
      .expect(201)

    const returnedBlogs = await api.get('/api/blogs')
    const blogInfo = await returnedBlogs.body

    assert.strictEqual(blog.likes, blogInfo[0].likes)
  })
})

after(async () => {
  await mongoose.connection.close()
})