import PropTypes from 'prop-types'
import React from 'react'

const Login = ({
  handleSubmit,
  username,
  password,
  setUsername,
  setPassword
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            username &nbsp;
            <input
              data-testid="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
  setPassword: PropTypes.func.isRequired
}

export default Login
