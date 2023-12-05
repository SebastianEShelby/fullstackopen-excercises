import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { sendNotification } from './notificationReducer'
import NOTIFICATION_MESSAGE_TYPES from '../constants/notification-message-types'

const initialState = []

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setAll(state, action) {
      return action.payload
    },
    updateOne(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog,
      )
    },
    deleteOne(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    createOne(state, action) {
      return [...state, action.payload]
    },
    createCommentForOne(state, action) {
      const updatedBlogId = action.payload.id
      const comment = action.payload.comment
      return state.map((blog) =>
        blog.id === updatedBlogId
          ? { ...blog, comments: [...blog.comments, comment] }
          : blog,
      )
    },
  },
})

export default blogsSlice.reducer
const { setAll, updateOne, deleteOne, createOne, createCommentForOne } =
  blogsSlice.actions
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setAll(blogs))
  }
}
export const updateBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blog)
      dispatch(updateOne(updatedBlog))
      dispatch(
        sendNotification(
          `Blog "${updatedBlog.title}" ${
            updatedBlog.author ? `by "${updatedBlog.author}"` : ''
          } likes updated to ${updatedBlog.likes}`,
          NOTIFICATION_MESSAGE_TYPES.success,
        ),
      )
    } catch (exception) {
      dispatch(
        sendNotification(
          `${exception?.response?.data?.error ?? 'server error'}`,
          NOTIFICATION_MESSAGE_TYPES.error,
        ),
      )
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      dispatch(deleteOne(blog.id))
      dispatch(
        sendNotification(
          `Blog "${blog.title}" ${
            blog.author ? `by "${blog.author}"` : ''
          } was deleted!`,
          NOTIFICATION_MESSAGE_TYPES.success,
        ),
      )
    } catch (exception) {
      dispatch(
        sendNotification(
          `${exception.response.data.error}`,
          NOTIFICATION_MESSAGE_TYPES.error,
        ),
      )
    }
  }
}

export const createBlog = createAsyncThunk(
  'blogs/createOne',
  async (obj, thunkAPI) => {
    try {
      const createdBlog = await blogService.create(obj)
      thunkAPI.dispatch(createOne(createdBlog))
      thunkAPI.dispatch(
        sendNotification(
          `A new blog "${createdBlog.title}" ${
            createdBlog.author ? `by "${createdBlog.author}"` : ''
          } added!`,
          NOTIFICATION_MESSAGE_TYPES.success,
        ),
      )
    } catch (exception) {
      throw new createBlogError(
        exception?.response?.data?.error ?? 'unknown server error',
      )
    }
  },
)

class createBlogError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CreateBlogError'
  }
}

export const createBlogComment = createAsyncThunk(
  'blogs/createCommentForOne',
  async (obj, thunkAPI) => {
    const { blog, comment } = obj
    try {
      const updatedBlog = await blogService.createComment(blog.id, comment)
      thunkAPI.dispatch(createCommentForOne({ id: blog.id, comment }))
      thunkAPI.dispatch(
        sendNotification(
          `Added comment "${comment}"!`,
          NOTIFICATION_MESSAGE_TYPES.success,
        ),
      )
    } catch (exception) {
      throw new createBlogError(
        exception?.response?.data?.error ?? 'unknown server error',
      )
    }
  },
)
