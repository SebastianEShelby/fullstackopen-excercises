import { createSlice } from '@reduxjs/toolkit'

const initialState = 'render here notification...'

const notificationSlice = createSlice({
  name: 'notification',
  initialState
})

export default notificationSlice.reducer