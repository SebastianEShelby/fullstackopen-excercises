import { useState, useEffect } from 'react'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
        username, password,
      })
      window.localStorage.setItem(
        'LoggedInBlogListUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('LoggedInBlogListUser')
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <Notification message={errorMessage} />

      {user === null ?
        <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />
        :
        <>
          <Blogs user={user} logout={logout} />
        </>
      }
    </>
  )
}

export default App