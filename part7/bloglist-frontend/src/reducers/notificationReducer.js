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
    setOne(state, action) {
      return action.payload
    },
    hideOne() {
      return ''
    },
  },
})

const { setOne, hideOne } = notificationSlice.actions
export default notificationSlice.reducer

export const sendNotification = (
  message,
  type,
  timeout = type === NOTIFICATION_MESSAGE_TYPES.success ? 5 : 10,
) => {
  return (dispatch) => {
    dispatch(setOne({ message, type }))
    setTimeout(() => {
      dispatch(hideOne())
    }, timeout * 1000)
  }
}
