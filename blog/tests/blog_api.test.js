const { test, describe, after, beforeEach, expect } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "Front-end Artcles and Tutorials",
    author: "Josh W Comeau",
    url: "https://www.joshwcomeau.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Hackaday",
    author: "Jenny List",
    url: "https://hackaday.com/blog/",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Increment",
    author: "James Turnbull",
    url: "https://increment.com/",
    likes: 12,
    __v: 0
  },
]

beforeEach(async() => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

test('blog entries are turned as json', async() => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test(`there are ${initialBlogs.length} blog posts`, async() => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('unique id property is named id', async() => {
  const response = await api.get('/api/blogs')
  const idCheck = response.body.some(blog => 'id' in blog)

  assert.strictEqual(idCheck, true)
})

test('a valid blog can be added ', async() => {
  const newBlog = {
    _id: '67b7ca4cd3432e48b23cc0b9',
    title: 'Krebs on Security',
    author: 'Brian Krebs',
    url: 'https://krebsonsecurity.com/',
    likes: 5,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(b => b.content)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)
})

test('likes missing from request - defaults to zero', async() => {
  const newBlog = {
    _id: '67b7ca4cd3432e48b23cc0b9',
    title: 'Krebs on Security',
    author: 'Brian Krebs',
    url: 'https://krebsonsecurity.com/',
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = await response.body

  assert.strictEqual(contents[3].likes, 0)
})

// test('title missing, bad request returned ', async() => {
//   const newBlog = {
//     _id: '67b7ca4cd3432e48b23cc0b8',
//     author: 'Various',
//     url: 'https://www.anandtech.com/',
//     likes: 5,
//     __v: 0
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)

//   const response = await api.get('/api/blogs')
//   assert.strictEqual(response.body, 'Bad Request')
// })

after(async () => {
  await mongoose.connection.close()
})