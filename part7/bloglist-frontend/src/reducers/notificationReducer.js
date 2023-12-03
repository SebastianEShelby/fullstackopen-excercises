import { createSlice } from '@reduxjs/toolkit'
import NOTIFICATION_MESSAGE_TYPES from '../constants/notification-message-types'

const initialState = {
  message: '',
  type: '',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    hideNotification() {
      return ''
    },
  },
})

const { setNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const sendNotification = (
  message,
  type,
  timeout = type === NOTIFICATION_MESSAGE_TYPES.success ? 5 : 10,
) => {
  return (dispatch) => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(hideNotification())
    }, timeout * 1000)
  }
}
