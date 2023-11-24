import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

beforeEach(() => {
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

  render(<Blog blog={blog} user={user} />)
})


test('only renders blog title and author by default ', () => {
  const blogElement = screen.getByTestId('blog')
  const blogDetailsElement = screen.getByTestId('blog-details')

  expect(blogElement).toHaveTextContent('Test blog')
  expect(blogElement).toHaveTextContent('author')
  expect(blogDetailsElement).toHaveStyle('display: none')
})


test('blog URL and number of likes are shown when "view" button is clicked ', async () => {
  const blogElement = screen.getByTestId('blog')
  const blogDetailsElement = screen.getByTestId('blog-details')
  const viewBlogDetailsButton = screen.getByTestId('view-blog-details')
  const user = userEvent.setup()

  await user.click(viewBlogDetailsButton)

  expect(blogElement).toHaveTextContent('Test blog')
  expect(blogElement).toHaveTextContent('author')
  expect(blogElement).toHaveTextContent('fakedomain.com')
  expect(blogElement).toHaveTextContent('1')
  expect(blogDetailsElement).not.toHaveStyle('display: none')
})