import { useState } from 'react';

const Blog = ({ blog, user }) => {
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
  //console.log(user.id)
  //console.log(user.username)
  //console.log(user.name)

  const expandBlog = () => {
    setExpanded(!expand);
  };

  const handleLikes = () => {};

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
