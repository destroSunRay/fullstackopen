import { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlog, likeBlog, addComment } from '../reducers/blogsReducer'
import { useParams, useNavigate } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()
  const [blog, setBlog] = useState(null)
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const params = useParams()
  const commentRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    setBlog(blogs.find(blog => blog.id === params.id))
  }, [user, blogs, params.id])

  const handleRemoveBlog = async blog => {
    await dispatch(removeBlog(blog))
    navigate('/')
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

  const handleAddComment = e => {
    e.preventDefault()
    // console.log(commentRef.current.value)
    dispatch(addComment(blog, commentRef.current.value))
    commentRef.current.value = ''
  }

  if (!blog) {
    return null
  }

  return (
    <div className="blog">
      <h1>
        {blog.title} by {blog.author}
      </h1>
      <div className="blog-details">
        <a href={blog.url}>{blog.url}</a>
        <div>
          likes {blog.likes}{' '}
          <button onClick={() => dispatch(likeBlog(blog))}>like</button>
        </div>
        <div>
          added by <b>{blog.user.name}</b>
        </div>
        {removeButton()}
      </div>
      <div>
        <h4>Comments</h4>
        <form onSubmit={handleAddComment}>
          <input type="text" ref={commentRef} />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, i) => (
            <li key={i}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

Blog.displayName = 'Blog'
export default Blog
