const { test, describe, after, beforeEach, expect } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/blog_helper')

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Krebs on Security',
      author: 'Brian Krebs',
      url: 'https://krebsonsecurity.com/',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals its number of likes', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  const blogs = [
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
  ]

  test('when list has multiple blogs, returns total likes', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 12)
  }) 

  describe('total likes', () => {

    const blogs = [
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
    test('returns the blog with the most likes', () => {
      const result = listHelper.mostLikes(blogs)
      const maxBlog = { title: blogs[2].title,
                        author: blogs[2].author,
                        likes: blogs[2].likes
      }
      assert(result, maxBlog)
    })
  })
})

