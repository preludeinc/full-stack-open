const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "Front-end Artcles and Tutorials",
    author: "Josh W Comeau",
    url: "https://www.joshwcomeau.com/",
    likes: 7,
  },
  {
    title: "Hackaday",
    author: "Jenny List",
    url: "https://hackaday.com/blog/",
    likes: 5,
  },
  {
    title: "Increment",
    author: "James Turnbull",
    url: "https://increment.com/",
    likes: 12,
    },
]
  
const newBlog = {
  title: 'Krebs on Security',
  author: 'Brian Krebs',
  url: 'https://krebsonsecurity.com/',
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  newBlog,
  blogsInDb,
  usersInDb,
}
  