import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [message, setMessage] = useState(null)
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const addBlog = async(event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
      likes: likes
    }

    try {
      const blog = await blogService.create(newBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
      setLikes(0)
      console.log(`added blog ${newBlog.title}`)
      setMessage(`added blog ${newBlog.title}`)
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);
    } catch (exception) {
      setMessage(`${exception}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async(event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUserName('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleBlogChange = async(event) => {
    const { name, value } = event.target

    switch (name) {
      case 'title': 
        setTitle(value) 
        break
      case 'author': 
        setAuthor(value) 
        break
      case 'url':
        setUrl(value)
        break
      case 'likes':
        setLikes(Number(value))
        break
    }
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
      <div>
        <span>username </span>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUserName(target.value) }
          />
      </div>
      <div>
          <span>password </span>
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          <div>
            <button type="submit">login</button>
          </div>
      </div>
    </form>
    )
  }

  const blogForm = () => {
    return (
      <form onSubmit={addBlog}>
        <div>
          <p>add a new blog entry...</p>
          <div>
          <label>title </label>
          <input 
            name='title'
            value={title}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          <label>author </label>
          <input 
            name='author'
            value={author}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          <label>url </label>
          <input 
            name='url'
            value={url}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          <label>likes </label>
          <input 
            name='likes'
            value={likes}
            onChange={handleBlogChange}
          />
        </div>
      <div>
        <button type="submit">save</button>
      </div>
    </div>
    </form>
    )
  }

  return (
    <div>
      <h1>Blogs App</h1>

      <Notification message={message}/>

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} is logged-in</p>
          {blogForm()}
        </div>
      }

      {user && (
        <>
        <h2>blogs</h2>
          <ul>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}      
        </ul>  
        </>
      )}
    </div>
  )
}

export default App