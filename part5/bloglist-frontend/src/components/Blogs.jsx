import { useEffect, useRef, useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import CreateBlog from './CreateBlog'
import Togglable from './Togglable'

const Blogs = ({ user, logout, setNotificationWithTimeOut }) => {
  const [blogs, setBlogs] = useState([])
  const togglableBlogRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => {
        setBlogs(blogs)
      })
  }, [])

  if (!blogs || blogs.length < 1) return <h2>No blogs found</h2>

  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in &nbsp;
        <button onClick={() => logout()}>
          logout
        </button>
      </p>

      <Togglable buttonLabel="create new blog" ref={togglableBlogRef}>
        <CreateBlog blogs={blogs} setBlogs={setBlogs} setNotificationWithTimeOut={setNotificationWithTimeOut} togglableBlogRef={togglableBlogRef} />
      </Togglable>

      <br />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs