import { useEffect } from 'react'
import Login from './components/Login'
import blogService from './services/blogs'
import { initializeUser, userLogout } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import BlogsList from './components/BlogsList'
import Users from './components/Users'
import User from './components/User'
import { Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom'
import { initializeAllUsers } from './reducers/allUsersReducer'
import Blog from './components/Blog'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs())
      dispatch(initializeAllUsers())
      blogService.setToken(user.token)
    }
  }, [user])

  const handleLogout = () => {
    dispatch(userLogout())
    navigate('/login')
  }

  return (
    <>
      {location.pathname === '/login' ? null : (
        <>
          <div style={{ backgroundColor: 'gray' }}>
            <nav style={{ display: 'flex' }}>
              <Link to="/" style={{ marginRight: '1rem' }}>
                blogs
              </Link>
              <Link to="/users" style={{ marginRight: '1rem' }}>
                users
              </Link>
              {user ? (
                <span>
                  {user.name} logged in{' '}
                  <button onClick={handleLogout}>logout</button>
                </span>
              ) : null}
            </nav>
          </div>
          <h2>blogs app</h2>
        </>
      )}
      <Routes>
        <Route path="/" element={<BlogsList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </>
  )
}

export default App
