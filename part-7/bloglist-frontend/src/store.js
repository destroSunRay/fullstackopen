import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'
import allUsersReducer from './reducers/allUsersReducer'

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
    allUsers: allUsersReducer
  },
})