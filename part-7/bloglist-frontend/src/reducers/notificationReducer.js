import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification: (state, action) => {
      // console.log('showNotification:', action.payload)
      return action.payload
    }
  }
})

export const { showNotification } = notificationSlice.actions

export const setNotification = (notification) => {
  return dispatch => {
    dispatch(showNotification(notification))
    setTimeout(() => {
      dispatch(showNotification(''))
    }, 5000)
  }
}
export default notificationSlice.reducer