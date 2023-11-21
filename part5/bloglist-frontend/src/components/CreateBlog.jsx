import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const clearBlogForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const createBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title,
      author,
      url
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        clearBlogForm()
      })
  }

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={createBlog}>
        Title: <input type="text" name="title" value={title} onChange={({ target }) => setTitle(target.value)} />
        <br />
        Author: <input type="text" name="author" value={author} onChange={({ target }) => setAuthor(target.value)} />
        <br />
        Url: <input type="text" name="url" value={url} onChange={({ target }) => setUrl(target.value)} />
        <br />
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default CreateBlog