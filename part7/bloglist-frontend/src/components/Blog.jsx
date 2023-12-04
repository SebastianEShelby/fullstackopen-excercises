import { updateBlog, deleteBlog } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'

const Blog = ({ blog }) => {
  const userSelector = (state) => state.user
  const user = useSelector(userSelector)
  const dispatch = useDispatch()

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
    </div>
  )
}

export default Blog
