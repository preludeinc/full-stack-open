

import { useState, useEffect } from "react";
import blogService from '../services/blogs';

const BlogForm = ({ setBlogs, setNotification }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleBlogChange = async (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "author":
        setAuthor(value);
        break;
      case "url":
        setUrl(value);
        break;
      case "likes":
        setLikes(Number(value));
        break;
    }
  };

  // should this be in parent?
  const addBlog = async (event) => {
    event.preventDefault();

    const newBlog = {
      title: title,
      author: author,
      url: url,
      likes: likes,
    };

    try {
      const blog = await blogService.create(newBlog);
      setTitle("");
      setAuthor("");
      setUrl("");
      setLikes(0);
      console.log(`added blog ${newBlog.title}`);
      setNotification(`new blog ${newBlog.title} by ${newBlog.author} added`);
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);
    } catch (exception) {
      setNotification(`${exception}`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        <p>add a new blog entry...</p>
        <div>
          <label>title </label>
          <input name="title" value={title} onChange={handleBlogChange} />
        </div>
        <div>
          <label>author </label>
          <input name="author" value={author} onChange={handleBlogChange} />
        </div>
        <div>
          <label>url </label>
          <input name="url" value={url} onChange={handleBlogChange} />
        </div>
        <div>
          <label>likes </label>
          <input name="likes" value={likes} onChange={handleBlogChange} />
        </div>
        <div>
          <button type="submit">save</button>
        </div>
      </div>
    </form>
  );
};

export default BlogForm;
