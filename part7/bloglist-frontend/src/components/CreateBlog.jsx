import { useState } from 'react'
import blogService from '../services/blogs'
import NOTIFICATION_MESSAGE_TYPES from '../constants/notification-message-types'
import { useDispatch } from 'react-redux'
import { sendNotification } from '../reducers/notificationReducer'

const CreateBlog = ({ blogs, setBlogs, togglableBlogRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()
  const clearBlogForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const createBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title,
      author,
      url,
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      clearBlogForm()
      togglableBlogRef.current.toggleVisibility()

      dispatch(
        sendNotification(
          `A new blog "${returnedBlog.title}" ${
            returnedBlog.author ? `by "${returnedBlog.author}"` : ''
          } added!`,
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

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={createBlog}>
        Title:{' '}
        <input
          data-testid="title"
          type="text"
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        Author:{' '}
        <input
          data-testid="author"
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        Url:{' '}
        <input
          data-testid="url"
          type="text"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <button data-testid="create-blog" type="submit">
          create
        </button>
      </form>
    </>
  )
}

export default CreateBlog
