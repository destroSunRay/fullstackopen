import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { initializeUser, userLogout } from '../reducers/userReducer'
import { initializeAllUsers } from '../reducers/allUsersReducer'
import { setNotification } from '../reducers/notificationReducer'

const Users = () => {
  const users = useSelector(state => state.allUsers)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      if (window.localStorage.getItem('user')) {
        dispatch(initializeUser())
      } else {
        setNotification({ message: 'Login to access the users', type: 'error' })
        navigate('/login')
      }
    } else {
      dispatch(initializeAllUsers())
    }
  }, [])

  if (!users) {
    return null
  }

  return (
    <>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Users
