import { useEffect, useState } from 'react'
import {
  updateBlog,
  deleteBlog,
  createBlogComment,
} from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { sendNotification } from '../reducers/notificationReducer'
import NOTIFICATION_MESSAGE_TYPES from '../constants/notification-message-types'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

const Blog = ({ blog }) => {
  const userSelector = (state) => state.user
  const user = useSelector(userSelector)
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const increaseBlogLikes = async (event) => {
    event.preventDefault()
    const blogToUpdate = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    }
    dispatch(updateBlog(blogToUpdate))
  }

  const removeBlog = (event) => {
    event.preventDefault()

    if (
      !window.confirm(
        `Removing blog ${blog.name} by ${blog.author}. Are you sure?`,
      )
    )
      return

    dispatch(deleteBlog(blog))
  }

  const handleAddComment = async (event) => {
    event.preventDefault()
    try {
      await dispatch(createBlogComment({ blog, comment })).unwrap()
      setComment('')
    } catch (exception) {
      dispatch(
        sendNotification(exception.message, NOTIFICATION_MESSAGE_TYPES.error),
      )
    }
  }

  if (!blog) return <h2>Blog not found!</h2>

  return (
    <div>
      <h2 className="mt-5 mb-4">{`"${blog.title}" by "${blog.author}"`}</h2>
      <ListGroup>
        {blog.url ? (
          <ListGroup.Item>
            <b>Url:</b>
            <a href={blog.url}> {blog.url}</a>
          </ListGroup.Item>
        ) : null}
        {blog.likes !== (null || undefined) ? (
          <ListGroup.Item>
            <b>Likes:</b> {blog.likes}
            &nbsp;
            <Button variant="outline-primary" onClick={increaseBlogLikes}>
              like
            </Button>
          </ListGroup.Item>
        ) : null}
        {blog.user.name ? (
          <ListGroup.Item>
            {' '}
            <b>User:</b> {blog.user.name}{' '}
          </ListGroup.Item>
        ) : null}
      </ListGroup>
      {blog.user.username === user.username ? (
        <Button className="mt-3" variant="outline-danger" onClick={removeBlog}>
          remove
        </Button>
      ) : null}
      <div className="mt-5">
        <h3 className="mb-4">Comments</h3>
        <Form onSubmit={handleAddComment}>
          <FloatingLabel
            controlId="commentInput"
            label="Comment"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="comment"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
              placeholder="A valuable comment!"
            />
          </FloatingLabel>
          <Button variant="outline-primary" type="submit">
            add comment
          </Button>
        </Form>
        <div className="mt-5">
          {blog.comments && blog.comments.length > 0 ? (
            <ListGroup>
              {blog.comments.map((comment, i) => (
                <ListGroup.Item key={i}>{comment}</ListGroup.Item>
              ))}
            </ListGroup>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Blog
