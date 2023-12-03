import { useState, useEffect } from 'react'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'
import NOTIFICATION_MESSAGE_TYPES from './constants/notification-message-types'
import { sendNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

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
      dispatch(
        sendNotification(
          `${user.name} logged in!`,
          NOTIFICATION_MESSAGE_TYPES.success,
        ),
      )
    } catch (exception) {
      dispatch(
        sendNotification('Wrong credentials', NOTIFICATION_MESSAGE_TYPES.error),
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
    dispatch(
      sendNotification(
        `${userName} logged out!`,
        NOTIFICATION_MESSAGE_TYPES.success,
      ),
    )
  }

  return (
    <>
      <Notification />

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
          <Blogs user={user} logout={logout} />
        </>
      )}
    </>
  )
}

export default App
