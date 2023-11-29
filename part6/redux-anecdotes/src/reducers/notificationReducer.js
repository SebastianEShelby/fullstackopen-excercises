import { createSlice } from '@reduxjs/toolkit'

const initialState = 'render here notification...'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    sendNotification(state, action) {
      return action.payload
    },
    hideNotification() {
      return ''
    }
  }
})

export default notificationSlice.reducer
export const { sendNotification, hideNotification } = notificationSlice.actions