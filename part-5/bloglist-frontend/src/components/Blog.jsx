import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, user, handleBlogUpdate, handleRemoveBlog }) => {
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

  const removeButton = () => {
    if (blog.user.name === user.name && blog.user.username === user.username) {
      return (
        <div>
          <button onClick={() => handleRemoveBlog(blog)}>remove</button>
        </div>
      )
    }
  }

  return (
    <div style={blogStyle} className="blog">
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
          {removeButton()}
        </div>
      ) : null}
    </div>
  )
}

Blog.displayName = 'Blog'
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleBlogUpdate: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
