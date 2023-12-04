import { useEffect, useRef, useState } from 'react'
import Blog from './Blog'
import CreateBlog from './CreateBlog'
import Togglable from './Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogsReducer'
import { createSelector } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogsSelector = (state) => state.blogs
  const sortedBlogsSelector = createSelector(blogsSelector, (blogs) =>
    [...blogs].sort((a, b) => b.likes - a.likes),
  )

  const sortedBlogs = useSelector(sortedBlogsSelector)
  const togglableBlogRef = useRef()
  const isBlogs = sortedBlogs && sortedBlogs.length > 0
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const blogStyle = {
    padding: '10px 10px',
    border: '1px solid black',
    marginBottom: 5,
  }

  return (
    <div data-testid="blogs">
      <Togglable buttonLabel="create new blog" ref={togglableBlogRef}>
        <CreateBlog togglableBlogRef={togglableBlogRef} />
      </Togglable>
      <br />
      {isBlogs
        ? sortedBlogs.map((blog) => (
            <div key={blog.id} style={blogStyle}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>
          ))
        : null}
    </div>
  )
}

export default Blogs

{
  /* <Blog  blog={blog} /> */
}
