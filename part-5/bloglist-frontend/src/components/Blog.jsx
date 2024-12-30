import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, handleBlogUpdate, handleRemoveBlog }) => {
  const [showFullDetails, setShowFullDetails] = useState(false)

  const handleToogleDetails = () => {
    setShowFullDetails(!showFullDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <span>
        {blog.title} || {blog.author}
      </span>
      <button onClick={handleToogleDetails}>
        {showFullDetails ? 'hide' : 'view'}
      </button>
      {showFullDetails ? (
        <div className="blog-details">
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <button onClick={() => handleBlogUpdate(blog)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          <button onClick={() => handleRemoveBlog(blog)}>remove</button>
        </div>
      ) : null}
    </div>
  )
}

Blog.displayName = 'Blog'
Blog.prototype = {
  blog: PropTypes.object.isRequired,
  handleBlogUpdate: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired
}

export default Blog
