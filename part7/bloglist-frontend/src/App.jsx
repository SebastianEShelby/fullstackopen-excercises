import { useState, useEffect } from 'react'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'
import NOTIFICATION_MESSAGE_TYPES from './constants/notification-message-types'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const setNotificationWithTimeOut = (message, type, delay = 5000) => {
    if (!message || !type) setNotification(null)
    if (type === NOTIFICATION_MESSAGE_TYPES.error) delay = 10000
    setNotification({ message: message, type: type })
    setTimeout(() => {
      setNotification(null)
    }, delay)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('LoggedInBlogListUser')
    if (!loggedUserJSON) return
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    blogService.setToken(user.token)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('LoggedInBlogListUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setNotificationWithTimeOut(
        `${user.name} logged in!`,
        NOTIFICATION_MESSAGE_TYPES.success,
      )
    } catch (exception) {
      setNotificationWithTimeOut(
        'Wrong credentials',
        NOTIFICATION_MESSAGE_TYPES.error,
      )
    }
  }

  const logout = () => {
    const userName = user.name
    window.localStorage.removeItem('LoggedInBlogListUser')
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
    setNotificationWithTimeOut(
      `${userName} logged out!`,
      NOTIFICATION_MESSAGE_TYPES.success,
    )
  }

  return (
    <>
      <Notification notification={notification} />

      {user === null ? (
        <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <>
          <Blogs
            user={user}
            logout={logout}
            setNotificationWithTimeOut={setNotificationWithTimeOut}
          />
        </>
      )}
    </>
  )
}

export default App
