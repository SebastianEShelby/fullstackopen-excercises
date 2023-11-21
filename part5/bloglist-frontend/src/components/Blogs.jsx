import { useEffect, useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import CreateBlog from './CreateBlog'

const Blogs = ({ user, logout }) => {
  const [blogs, setBlogs] = useState([])

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

      <CreateBlog blogs={blogs} setBlogs={setBlogs} />
      <br />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs