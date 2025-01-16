import React, { useEffect } from 'react'
import Notification from './Notification'
import BlogForm from './BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser, userLogout } from '../reducers/userReducer'
import { Link, useNavigate } from 'react-router-dom'

const BlogsList = () => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) {
      dispatch(initializeUser())
      const localUser = JSON.parse(window.localStorage.getItem('user'))
      if (!localUser) {
        navigate('/login')
      }
    }
  }, [])

  if (!user) {
    return null
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <>
      <Notification />
      <BlogForm />
      <br />
      <div style={{ marginTop: '0.6rem' }}>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <div key={blog.id} style={blogStyle}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>
          ))}
      </div>
    </>
  )
}

export default BlogsList
