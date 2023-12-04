import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { sendNotification } from './notificationReducer'
import NOTIFICATION_MESSAGE_TYPES from '../constants/notification-message-types'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setOne(state, action) {
      return {
        name: action.payload.name,
        username: action.payload.username,
      }
    },
    clearOne() {
      return null
    },
  },
})

export default userSlice.reducer
const { setOne, clearOne } = userSlice.actions

export const setUser = setOne

export const login = (info) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(info)
      window.localStorage.setItem('LoggedInBlogListUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setOne(user))
      dispatch(
        sendNotification(
          `${user.name} logged in!`,
          NOTIFICATION_MESSAGE_TYPES.success,
        ),
      )
    } catch (exception) {
      dispatch(
        sendNotification('Wrong credentials', NOTIFICATION_MESSAGE_TYPES.error),
      )
    }
  }
}

export const logout = () => {
  return async (dispatch, getState) => {
    const user = getState().user
    window.localStorage.removeItem('LoggedInBlogListUser')
    blogService.setToken(null)
    dispatch(clearOne())
    dispatch(
      sendNotification(
        `${user.name} logged out!`,
        NOTIFICATION_MESSAGE_TYPES.success,
      ),
    )
  }
}
