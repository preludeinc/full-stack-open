import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogsList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleNotification = (notification) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (loginInfo) => {
    try {
      let username = loginInfo.username
      let password = loginInfo.password
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user))
      setUser(user)
    } catch (exception) {
      handleNotification('Wrong username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogAppUser')
    setUser(null)
    location.reload()
  }

  const addBlog = async (newBlog) => {
    try {
      const { title, author, url, likes } = newBlog

      const blogAndUser = {
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
        },
        likes: likes,
        author: author,
        title: title,
        url: url,
      }

      const addedBlog = await blogService.create(blogAndUser, user.token)
      blogFormRef.current.toggleVisibility()
      if (addedBlog) {
        setBlogs((blogs) => [...blogs, addedBlog])
        handleNotification(
          `new blog ${newBlog.title} by ${newBlog.author} added`,
        )
      }
    } catch (error) {
      handleNotification(`${error}`)
    }
  }

  const cancelAdd = () => {
    blogFormRef.current.toggleVisibility()
  }

  const updateLikes = async (blogId, updatedBlog) => {
    const { title, author, url, likes } = updatedBlog

    const formattedBlog = {
      user: user.id,
      likes: likes,
      author: author,
      title: title,
      url: url,
    }
    const updateBlog = await blogService.update(blogId, formattedBlog)
    if (updateBlog) {
      setBlogs(blogs.map((blog) => (blog.id === blogId ? updatedBlog : blog)))
      handleNotification(`updated blog ${updateBlog.title}`)
    }
  }

  const removeBlog = async (blogId, deletedBlog) => {
    console.log(user.token)
    const removedBlog = await blogService.remove(blogId, user.token)
    const updatedBlogs = blogs.filter((blog) => blog.id !== blogId)
    setBlogs(updatedBlogs)
    handleNotification(`removed blog ${deletedBlog}`)
  }

  return (
    <div>
      {user === null ? (
        <>
          <Notification notification={notification} />
          <LoginForm handleLogin={handleLogin} />
        </>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <p>
            {user.name} logged in
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </p>
          {user && (
            <>
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm addBlog={addBlog} cancelAdd={cancelAdd} />
              </Togglable>
              <BlogList
                blogs={blogs}
                user={user}
                updateLikes={updateLikes}
                removeBlog={removeBlog}
              />
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default App
