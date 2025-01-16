import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/userReducer'
import Notification from './Notification'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLoginFormSubmit = async e => {
    e.preventDefault()
    await dispatch(userLogin(username, password))
    setUsername('')
    setPassword('')
    navigate('/')
  }

  return (
    <>
      <h2>login into application</h2>
      <Notification />
      <form onSubmit={handleLoginFormSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            username &nbsp;
            <input
              data-testid="username"
              name="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            password &nbsp;
            <input
              data-testid="password"
              name="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </>
  )
}

Login.displayName = 'Login'
Login.prototype = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
}

export default Login
