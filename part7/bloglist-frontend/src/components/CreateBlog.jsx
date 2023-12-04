import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { sendNotification } from '../reducers/notificationReducer'
import NOTIFICATION_MESSAGE_TYPES from '../constants/notification-message-types'

const CreateBlog = ({ togglableBlogRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()
  const clearBlogForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const blogObject = { title, author, url }

    try {
      await dispatch(createBlog(blogObject)).unwrap()
      clearBlogForm()
      togglableBlogRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(
        sendNotification(exception.message, NOTIFICATION_MESSAGE_TYPES.error),
      )
    }
  }

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={handleCreateBlog}>
        Title:
        <input
          data-testid="title"
          type="text"
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        Author:
        <input
          data-testid="author"
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        Url:
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
