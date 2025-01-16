import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer' // Adjust the path as necessary
import loginService from '../services/login' // Adjust the path as necessary
import { useNavigate } from 'react-router-dom'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setLoginUser: (state, action) => {
      return action.payload
    }
  }
})

const { setLoginUser } = userSlice.actions

export const initializeUser = () => {
  return dispatch => {
    const localUser = JSON.parse(window.localStorage.getItem('user'))
    if (localUser) {
      dispatch(setLoginUser(localUser))
      dispatch(
        setNotification({
          message: `Welcome back, ${localUser.name}!`,
          type: 'success',
        })
      )
    }
  }
}

export const userLogin = (username, password) => {
  return async dispatch => {
    try {
      const loggedInUser = await loginService.login({ username, password })
      dispatch(
        setNotification({ message: `Welcome ${username}`, type: 'success' })
      )
      window.localStorage.setItem('user', JSON.stringify(loggedInUser))
      dispatch(setLoginUser(loggedInUser))
    } catch (error) {
      dispatch(
        setNotification({
          message: 'Wrong username or password',
          type: 'error',
        })
      )
    }
  }
}

export const userLogout = () => {
  return async dispatch => {
    dispatch(setLoginUser(null))
    window.localStorage.removeItem('user')
    dispatch(
      setNotification({ message: 'Successfully logged out!', type: 'success' })
    )
  }
}

export default userSlice.reducer