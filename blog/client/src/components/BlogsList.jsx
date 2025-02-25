import Blog from './Blog.jsx';

const BlogList = ({ blogs, user }) => {
  return (
    <ul>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </ul>
  );
};

export default BlogList;
