import { useState } from "react"
import blogService from '../services/blogs'
import NOTIFICATION_MESSAGE_TYPES from "../constants/notification-message-types"

const Blog = ({ blog, setNotificationWithTimeOut, updateBlogs, updateBlogsAfterDelete, user }) => {
  const [isDetailedView, setIsDetailedView] = useState(false)
  const toggleIsDetailedView = () => {
    setIsDetailedView(!isDetailedView)
  }

  const blogStyle = {
    padding: "10px 10px",
    border: '1px solid black',
    marginBottom: 5
  }

  const updateBlogLikes = async (event) => {
    event.preventDefault()

    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    try {

      const updatedBlog = await blogService.update(blog.id, blogObject)

      updateBlogs(updatedBlog)

      setNotificationWithTimeOut(
        `Blog "${updatedBlog.title}" ${updatedBlog.author ? `by "${updatedBlog.author}"` : ""} likes updated to ${updatedBlog.likes}`,
        NOTIFICATION_MESSAGE_TYPES.success
      )

    } catch (exception) {
      setNotificationWithTimeOut(`
      ${exception.response.data.error}`,
        NOTIFICATION_MESSAGE_TYPES.error
      )
    }
  }

  const deleteBlog = async (event) => {
    event.preventDefault()

    if (!window.confirm(
      `Removing blog ${blog.name} by ${blog.author}. Are you sure?`
    )) return

    const blogToDelete = blog

    try {

      await blogService.remove(blogToDelete.id)

      updateBlogsAfterDelete(blogToDelete.id)

      setNotificationWithTimeOut(
        `Blog "${blogToDelete.title}" ${blogToDelete.author ? `by "${blogToDelete.author}"` : ""} was deleted!`,
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
    <div style={blogStyle}>
      <>{blog.title} {blog.author} <button onClick={toggleIsDetailedView}>{isDetailedView ? "hide" : "view"}</button></>
      <div style={{ display: isDetailedView ? "" : "none" }}>
        {blog.url ? <p>Url: {blog.url}</p> : null}
        {blog.likes !== (null || undefined) ?
          <p>Likes: {blog.likes}
            &nbsp;<button onClick={updateBlogLikes}>like</button>
          </p>
          : null
        }
        {blog.user.name ? <p>User: {blog.user.name}</p> : null}

        {blog.user.username === user.username ?
          <button style={{ 'color': 'red' }} onClick={deleteBlog}>remove</button>
          :
          null
        }

      </div >
    </div>
  )
}

export default Blog