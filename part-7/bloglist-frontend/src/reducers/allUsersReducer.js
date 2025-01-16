import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: null,
  reducers: {
    setAllUsers: (state, action) => {
      return action.payload
    }
  }
})

const { setAllUsers } = allUsersSlice.actions

export const initializeAllUsers = () => {
  return async dispatch => {
    const users = await userService.getUsers()
    dispatch(setAllUsers(users))
  }
}

export default allUsersSlice.reducer