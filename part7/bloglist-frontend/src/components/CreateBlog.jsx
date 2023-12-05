import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { sendNotification } from '../reducers/notificationReducer'
import NOTIFICATION_MESSAGE_TYPES from '../constants/notification-message-types'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

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
      <Form onSubmit={handleCreateBlog}>
        <FloatingLabel controlId="titleInput" label="Title" className="mb-3">
          <Form.Control
            onChange={({ target }) => setTitle(target.value)}
            type="text"
            name="title"
            value={title}
            placeholder="Awesome title"
          />
        </FloatingLabel>
        <FloatingLabel controlId="authorInput" label="Author" className="mb-3">
          <Form.Control
            onChange={({ target }) => setAuthor(target.value)}
            type="text"
            name="author"
            value={author}
            placeholder="John Doe"
          />
        </FloatingLabel>
        <FloatingLabel controlId="urlInput" label="Url" className="mb-3">
          <Form.Control
            onChange={({ target }) => setUrl(target.value)}
            type="text"
            name="url"
            value={url}
            placeholder="https://www.google.com"
          />
        </FloatingLabel>
        <Button className="mb-3" type="submit">
          create
        </Button>
      </Form>
    </>
  )
}

export default CreateBlog
