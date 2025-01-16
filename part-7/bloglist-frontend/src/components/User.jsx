import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { initializeAllUsers } from '../reducers/allUsersReducer'
import { userLogout } from '../reducers/userReducer'

const User = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  // console.log('id:', params.id)

  const allUsers = useSelector(state => state.allUsers)
  // console.log('allUsers', allUsers)

  useEffect(() => {
    if (!allUsers) {
      dispatch(initializeAllUsers())
    } else {
      const currUser = allUsers.find(user => params.id === user.id)
      // console.log('currUser', currUser)
      setUser(currUser)
      // console.log('user', user)
    }
  }, [allUsers, params.id, dispatch])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
