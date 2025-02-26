import Blog from './Blog.jsx';

const BlogList = ({ blogs, user, updateLikes, removeBlog }) => {
  const sortedBlogs = blogs.sort((a, b) => a.likes - b.likes)
  return (
    <ul>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateLikes={updateLikes}
          removeBlog={removeBlog}
        />
      ))}
    </ul>
  );
};

export default BlogList;
