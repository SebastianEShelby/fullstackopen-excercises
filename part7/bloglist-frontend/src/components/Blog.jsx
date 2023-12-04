import { useState } from 'react'
import {
  updateBlog,
  deleteBlog,
  createBlogComment,
} from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { sendNotification } from '../reducers/notificationReducer'
import NOTIFICATION_MESSAGE_TYPES from '../constants/notification-message-types'

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
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        {blog.url ? (
          <p>
            Url:<a href={blog.url}> {blog.url}</a>
          </p>
        ) : null}
        {blog.likes !== (null || undefined) ? (
          <p>
            Likes: {blog.likes}
            &nbsp;
            <button data-testid="update-blog-likes" onClick={increaseBlogLikes}>
              like
            </button>
          </p>
        ) : null}
        {blog.user.name ? <p>User: {blog.user.name}</p> : null}
        {blog.user.username === user.username ? (
          <button
            data-testid="remove-blog-button"
            style={{ color: 'red' }}
            onClick={removeBlog}
          >
            remove
          </button>
        ) : null}
      </div>
      <div>
        <h3>comments</h3>
        <form onSubmit={handleAddComment}>
          Title:
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <button type="submit">add comment</button>
        </form>
        {blog.comments && blog.comments.length > 0 ? (
          <ul>
            {blog.comments.map((comment, i) => (
              <li key={i}>{comment}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

export default Blog
