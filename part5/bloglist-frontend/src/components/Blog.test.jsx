import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {

  const setNotificationWithTimeOut = jest.fn()
  const updateBlogs = jest.fn()
  const updateBlogsAfterDelete = jest.fn()
  const user = {
    username: 'john',
    name: 'John Doe',
  }
  const blog = {
    title: 'Test blog',
    author: 'author',
    url: 'fakedomain.com',
    likes: 1,
    user: user
  }

  render(<Blog blog={blog} setNotificationWithTimeOut={setNotificationWithTimeOut} updateBlogs={updateBlogs} updateBlogsAfterDelete={updateBlogsAfterDelete} user={user} />)

  const blogElement = screen.getByTestId('blog')
  const blogDetailsElement = screen.getByTestId('blog-details')

  expect(blogElement).toHaveTextContent('Test blog')
  expect(blogElement).toHaveTextContent('author')

  expect(blogDetailsElement).toHaveStyle('display: none')

})