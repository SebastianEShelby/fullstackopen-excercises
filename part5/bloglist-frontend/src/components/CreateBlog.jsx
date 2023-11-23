import { useState } from 'react'
import blogService from '../services/blogs'
import NOTIFICATION_MESSAGE_TYPES from '../constants/notification-message-types'

const CreateBlog = ({ blogs, setBlogs, setNotificationWithTimeOut, togglableBlogRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
      url
    }

    try {

      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      clearBlogForm()
      togglableBlogRef.current.toggleVisibility()

      setNotificationWithTimeOut(
        `A new blog "${returnedBlog.title}" ${returnedBlog.author ? `by "${returnedBlog.author}"` : ""} added!`,
        NOTIFICATION_MESSAGE_TYPES.success
      )

    } catch (exception) {
      setNotificationWithTimeOut(`
      ${exception.response.data.error}`,
        NOTIFICATION_MESSAGE_TYPES.error
      )
    }
  }

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={createBlog}>
        Title: <input type="text" name="title" value={title} onChange={({ target }) => setTitle(target.value)} />
        <br />
        Author: <input type="text" name="author" value={author} onChange={({ target }) => setAuthor(target.value)} />
        <br />
        Url: <input type="text" name="url" value={url} onChange={({ target }) => setUrl(target.value)} />
        <br />
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default CreateBlog