import { useEffect, useRef } from 'react'
import CreateBlog from './CreateBlog'
import Togglable from './Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogsReducer'
import { createSelector } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'

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

  const BlogsList = () => {
    if (!isBlogs) return null
    return (
      <ListGroup>
        {sortedBlogs.map((blog) => (
          <ListGroup.Item key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    )
  }

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={togglableBlogRef}>
        <CreateBlog togglableBlogRef={togglableBlogRef} />
      </Togglable>
      <br />
      {BlogsList()}
    </div>
  )
}

export default Blogs
