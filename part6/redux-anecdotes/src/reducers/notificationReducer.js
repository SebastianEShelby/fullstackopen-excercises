import { createSlice } from '@reduxjs/toolkit'

const initialState = 'render here notification...'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    hideNotification() {
      return ''
    }
  }
})

export default notificationSlice.reducer
export const { setNotification, hideNotification } = notificationSlice.actions
export const sendNotification = (notification, timeout = 5) => {
  return dispatch => {
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(hideNotification())
    }, timeout * 1000)
  }
}