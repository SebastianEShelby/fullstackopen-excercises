import { useState } from 'react'
import { updateBlog, deleteBlog } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'

const Blog = ({ blog }) => {
  const userSelector = (state) => state.user
  const user = useSelector(userSelector)
  const [isDetailedView, setIsDetailedView] = useState(false)
  const dispatch = useDispatch()
  const toggleIsDetailedView = () => {
    setIsDetailedView(!isDetailedView)
  }

  const blogStyle = {
    padding: '10px 10px',
    border: '1px solid black',
    marginBottom: 5,
  }

  const increaseBlogLikes = async (event) => {
    event.preventDefault()
    const blogToUpdate = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    }
    dispatch(updateBlog(blogToUpdate))
  }

  const removeBlog = async (event) => {
    event.preventDefault()

    if (
      !window.confirm(
        `Removing blog ${blog.name} by ${blog.author}. Are you sure?`,
      )
    )
      return

    dispatch(deleteBlog(blog))
  }

  return (
    <div style={blogStyle} data-testid="blog">
      <>
        {blog.title} {blog.author}{' '}
        <button
          data-testid="toggle-blog-details-button"
          onClick={toggleIsDetailedView}
        >
          {isDetailedView ? 'hide' : 'view'}
        </button>
      </>
      <div
        data-testid="blog-details"
        style={{ display: isDetailedView ? '' : 'none' }}
      >
        {blog.url ? <p>Url: {blog.url}</p> : null}
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
    </div>
  )
}

export default Blog
