import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      return action.payload
    }
  }
})

export const { showNotification } = notificationSlice.actions

export const setNotification = (notification, delayInSeconds) => {
  return async dispatch => {
    dispatch(showNotification(notification))
    setTimeout(() => {
      dispatch(showNotification(''))
    }, delayInSeconds * 1000)
  }
}

export default notificationSlice.reducer