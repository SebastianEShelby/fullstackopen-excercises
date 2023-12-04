import { useEffect, useRef, useState } from 'react'
import Blog from './Blog'
import CreateBlog from './CreateBlog'
import Togglable from './Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogsReducer'
import { createSelector } from '@reduxjs/toolkit'
import { logout } from '../reducers/userReducer'

const Blogs = () => {
  const blogsSelector = (state) => state.blogs
  const sortedBlogsSelector = createSelector(blogsSelector, (blogs) =>
    [...blogs].sort((a, b) => b.likes - a.likes),
  )
  const userSelector = (state) => state.user
  const user = useSelector(userSelector)
  const sortedBlogs = useSelector(sortedBlogsSelector)
  const togglableBlogRef = useRef()
  const isBlogs = sortedBlogs && sortedBlogs.length > 0
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div data-testid="blogs">
      {isBlogs ? <h2>Blogs</h2> : <h2>No blogs found</h2>}
      <p>
        {user.name} logged in &nbsp;
        <button onClick={() => handleLogout()}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={togglableBlogRef}>
        <CreateBlog togglableBlogRef={togglableBlogRef} />
      </Togglable>

      <br />
      {isBlogs
        ? sortedBlogs.map((blog) => <Blog key={blog.id} blog={blog} />)
        : null}
    </div>
  )
}

export default Blogs
