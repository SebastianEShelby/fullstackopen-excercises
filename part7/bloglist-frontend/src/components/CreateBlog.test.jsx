import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

describe('<CreateBlog />', () => {
  const blogs = []
  const newBlog = {
    title: 'Test blog',
    author: 'author',
    url: 'fakedomain.com',
  }

  test('calls the event handler prop with correct information when a new blog is created', async () => {
    const setBlogs = jest.fn()
    const testUserEvent = userEvent.setup()
    const setNotificationWithTimeOut = jest.fn()

    render(
      <CreateBlog
        blogs={blogs}
        setBlogs={setBlogs}
        setNotificationWithTimeOut={setNotificationWithTimeOut}
      />,
    )

    const titleInput = screen.getByTestId('title')
    const authorInput = screen.getByTestId('author')
    const urlInput = screen.getByTestId('url')
    const submitButton = screen.getByTestId('create-blog')

    testUserEvent.type(titleInput, newBlog.title)
    testUserEvent.type(authorInput, newBlog.author)
    testUserEvent.type(urlInput, newBlog.url)

    await testUserEvent.click(submitButton)

    expect(setNotificationWithTimeOut).toHaveBeenCalledTimes(1)
    expect(setNotificationWithTimeOut.mock.calls[0][0]).toBe(
      'server error' ||
        `A new blog "${newBlog.title}" ${
          newBlog.author ? `by "${newBlog.author}"` : ''
        } added!`,
    )
  })
})
