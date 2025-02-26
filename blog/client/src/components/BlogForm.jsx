import PropTypes from 'prop-types'
import { useState } from 'react'

const BlogForm = ({ addBlog, cancelAdd }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  const handleBlogChange = async (event) => {
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

  const handleAddBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    addBlog(newBlog)
    clearData()
  }

  const handleCancel = (event) => {
    event.preventDefault()
    cancelAdd()
    clearData()
  }

  const clearData = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes(0)
  }

  return (
    <form>
      <div>
        <h2>create new blog</h2>
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
          <button className="button" onClick={handleAddBlog}>
            create
          </button>
          <button className="button-cancel" onClick={handleCancel}>
            cancel
          </button>
        </div>
      </div>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  cancelAdd: PropTypes.func.isRequired,
}

export default BlogForm
