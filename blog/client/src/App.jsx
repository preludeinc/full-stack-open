import { useState, useEffect } from "react";
import blogService from './services/blogs';
import loginService from './services/login';
import BlogList from './components/BlogsList.jsx'
import BlogForm from './components/BlogForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import Notification from './components/Notification.jsx';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [title, setTitle] = useState("");
  //const [author, setAuthor] = useState("");
  //const [url, setUrl] = useState("");
  //const [likes, setLikes] = useState(0);
  //const [user, setUser] = useState(null);

  // useEffect(() => {
  //   blogService.getAll().then((blogs) => setBlogs(blogs));
  // }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

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

  const handleNotificationChange = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedInBlogAppUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotification("Wrong username or password");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInBlogAppUser");
    setUser(null);
    location.reload();
  };

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

  return (
    <div>
      {user === null ? (
        <>
          <Notification notification={notification} />
          <LoginForm
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username}
            password={password}
            handleLogin={handleLogin}
          />
        </>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>Logout</button>
          </p>
          {user && (
            <>
              <BlogForm 
                setBlogs={setBlogs}
                setNotification={handleNotificationChange}
              />
              {/* <BlogForm
                handleBlogChange={handleBlogChange}
                title={title}
                author={author}
                url={url}
                likes={likes}
              /> */}
              <BlogList blogs={blogs} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
