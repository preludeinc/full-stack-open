import Blog from './Blog.jsx'

const BlogList = ({blogs}) => {
  return (
    <ul>
      {blogs.map((blog) => (
        <Blog key={blog.id} 
          title={blog.title} 
          author={blog.author} 
          url={blog.url} 
          likes={blog.likes} 
        />
      ))}
    </ul>
  )
}

export default BlogList
