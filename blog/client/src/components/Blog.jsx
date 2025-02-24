const Blog = ({ title, author, url, likes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <li>{title} - {author}</li>
   </div>  
)}

export default Blog