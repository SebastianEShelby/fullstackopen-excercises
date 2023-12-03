import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const user = {
    username: 'john',
    name: 'John Doe',
    id: '1111'
  }
  const blog = {
    title: 'Test blog',
    author: 'author',
    url: 'fakedomain.com',
    likes: 1,
    user: user,
    id: '2222'
  }

  test('only renders blog title and author by default ', () => {
    render(<Blog blog={blog} user={user} />)

    const blogElement = screen.getByTestId('blog')
    const blogDetailsElement = screen.getByTestId('blog-details')

    expect(blogElement).toHaveTextContent('Test blog')
    expect(blogElement).toHaveTextContent('author')
    expect(blogDetailsElement).not.toBeVisible()
  })

  test('blog URL and number of likes are shown when "view" button is clicked ', async () => {
    render(<Blog blog={blog} user={user} />)

    const blogElement = screen.getByTestId('blog')
    const blogDetailsElement = screen.getByTestId('blog-details')
    const viewBlogDetailsButton = screen.getByTestId('toggle-blog-details-button')
    const testUserEvent = userEvent.setup()

    await testUserEvent.click(viewBlogDetailsButton)

    expect(blogElement).toHaveTextContent('Test blog')
    expect(blogElement).toHaveTextContent('author')
    expect(blogElement).toHaveTextContent('fakedomain.com')
    expect(blogElement).toHaveTextContent('1')
    expect(blogDetailsElement).toBeVisible()
  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {

    const setNotificationWithTimeOut = jest.fn()
    render(<Blog blog={blog} user={user} setNotificationWithTimeOut={setNotificationWithTimeOut} />)

    const viewBlogDetailsButton = screen.getByTestId('toggle-blog-details-button')
    const updateBlogLikesButton = screen.getByTestId('update-blog-likes')
    const testUserEvent = userEvent.setup()

    await testUserEvent.click(viewBlogDetailsButton)
    expect(updateBlogLikesButton).toBeVisible()
    await testUserEvent.dblClick(updateBlogLikesButton)

    expect(setNotificationWithTimeOut).toHaveBeenCalledTimes(2)
  })
})