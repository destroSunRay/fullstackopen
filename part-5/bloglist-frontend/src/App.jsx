import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef(null)

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const loggedInUser = await loginService.login({ username, password })
      setNotification({ message: `Welcome ${username}`, type: 'success' })
      window.localStorage.setItem('user', JSON.stringify(loggedInUser))
      setUser(loggedInUser)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification({ message: 'Wrong username or password', type: 'error' })
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
    setNotification({ message: 'Successfully logged out!', type: 'success' })
  }

  const handleCreateNewBlog = async (e) => {
    e.preventDefault()
    try {
      const { title, author, url } = blogFormRef.current
      const newBlog = { title, author, url }
      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))
      blogFormRef.current.toogleBlogForm()
      setNotification({
        message: `new blog ${newBlog.title} has been added by, ${newBlog.author}`,
      })
    } catch (error) {
      setNotification({ message: error.message, type: 'error' })
    }
  }

  const handleBlogUpdate = async (blog) => {
    try {
      blog.likes += 1
      const { user, likes, author, title, url } = blog
      await blogService.update(blog.id, { user, likes, author, title, url })
      const response = await blogService.getAll()
      setBlogs(response)
    } catch (error) {
      console.error(error)
    }
  }
  const handleRemoveBlog = async (blog) => {
    try {
      if (
        blog.name === user.name &&
        blog.username === user.username &&
        window.confirm(`Remove blog ${blog.title}, by ${blog.author}`)
      ) {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter((blogg) => blogg.id !== blog.id))
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
    }
  }, [user])

  useEffect(() => {
    const localUser = JSON.parse(window.localStorage.getItem('user'))
    if (localUser) {
      setUser(localUser)
      setNotification({
        message: `Welcome back, ${localUser.name}!`,
        type: 'success',
      })
    }
  }, [])

  const blogsDisplay = () => {
    return (
      <>
        <h2>blogs</h2>
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
        <div>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </div>
        <br />
        <BlogForm handleCreateNewBlog={handleCreateNewBlog} ref={blogFormRef} />
        <br />
        <div style={{ marginTop: '0.6rem' }}>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleBlogUpdate={handleBlogUpdate}
                handleRemoveBlog={handleRemoveBlog}
              />
            ))}
        </div>
      </>
    )
  }

  const loginForm = () => (
    <>
      <h2>login into application</h2>
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
      <Login
        handleSubmit={handleLoginFormSubmit}
        username={username}
        password={password}
        setPassword={setPassword}
        setUsername={setUsername}
      />
    </>
  )

  return <>{user ? blogsDisplay() : loginForm()}</>
}

export default App
