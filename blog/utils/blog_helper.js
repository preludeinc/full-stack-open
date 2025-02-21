const totalLikes = (blogs) => {
  const sumLikes = blogs.reduce((acc, blog) => {
    return acc + blog.likes
  }, 0)
  return sumLikes
} 

const mostLikes = (blogs) => {
  const maxLikes = blogs.reduce((max, blog) => {
    return blog.likes > max.likes ? blog : max 
  }, blogs[0])
  return {  title: maxLikes.title,
            author: maxLikes.author,
            likes: maxLikes.likes
  }
}

module.exports = {
  totalLikes,
  mostLikes
}