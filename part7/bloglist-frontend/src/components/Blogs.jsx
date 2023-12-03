import { useEffect, useRef, useState } from 'react'
import Blog from './Blog'
import CreateBlog from './CreateBlog'
import Togglable from './Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogsReducer'
import { createSelector } from '@reduxjs/toolkit'

const blogsSelector = (state) => state.blogs
const sortedBlogsSelector = createSelector(blogsSelector, (blogs) =>
  [...blogs].sort((a, b) => b.likes - a.likes),
)

const Blogs = ({ user, logout }) => {
  const sortedBlogs = useSelector(sortedBlogsSelector)
  const togglableBlogRef = useRef()
  const isBlogs = sortedBlogs && sortedBlogs.length > 0
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  return (
    <div data-testid="blogs">
      {isBlogs ? <h2>Blogs</h2> : <h2>No blogs found</h2>}
      <p>
        {user.name} logged in &nbsp;
        <button onClick={() => logout()}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={togglableBlogRef}>
        <CreateBlog togglableBlogRef={togglableBlogRef} />
      </Togglable>

      <br />
      {isBlogs
        ? sortedBlogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))
        : null}
    </div>
  )
}

export default Blogs
