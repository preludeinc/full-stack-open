import { useState } from 'react';

const Blog = ({ blog, updateLikes, removeBlog }) => {
  const [expand, setExpanded] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    backgroundColor: 'ghostwhite',
    marginBottom: 5,
  };

  const title = blog.title;
  const url = blog.url;
  const likes = blog.likes;
  const author = blog.author;
  const blogId = blog.id;

  const expandBlog = () => {
    setExpanded(!expand);
  };

  const handleLikes = () => {
    const updatedBlog = {
      likes: Number(likes + 1),
      author: author,
      title: title,
      url: url
    }  
    updateLikes(blogId, updatedBlog);
  };

  const handleRemove = () => {
    removeBlog(blogId, title)
  }

  return (
    <div style={blogStyle}>
      {expand ? (
        <>
          <p>
            {title}
            <button className='toggle' onClick={expandBlog}>
              hide
            </button>
          </p>
          <p>{url}</p>
          <p>
            {likes}
            <button className='toggle' onClick={handleLikes}>
              likes
            </button>
          </p>
          <p>{author}</p>
          <button className='remove' onClick={handleRemove}>
            remove
          </button>
        </>
      ) : (
        <>
          <li>
            {title}
            <button className='toggle' onClick={expandBlog}>
              view details
            </button>
          </li>
        </>
      )}
    </div>
  );
};

export default Blog;
