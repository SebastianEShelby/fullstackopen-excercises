import { useEffect, useRef, useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import CreateBlog from './CreateBlog'
import Togglable from './Togglable'

const Blogs = ({ user, logout }) => {
  const [blogs, setBlogs] = useState([])
  const togglableBlogRef = useRef()
  const isBlogs = blogs && blogs.length > 0

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs)
    })
  }, [])

  const updateBlogs = (updatedBlog) => {
    setBlogs(
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)),
    )
  }

  const updateBlogsAfterDelete = (deletedBlogId) => {
    setBlogs(blogs.filter((blog) => blog.id !== deletedBlogId))
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div data-testid="blogs">
      {isBlogs ? <h2>Blogs</h2> : <h2>No blogs found</h2>}
      <p>
        {user.name} logged in &nbsp;
        <button onClick={() => logout()}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={togglableBlogRef}>
        <CreateBlog
          blogs={blogs}
          setBlogs={setBlogs}
          togglableBlogRef={togglableBlogRef}
        />
      </Togglable>

      <br />
      {isBlogs
        ? sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlogs={updateBlogs}
              updateBlogsAfterDelete={updateBlogsAfterDelete}
              user={user}
            />
          ))
        : null}
    </div>
  )
}

export default Blogs
