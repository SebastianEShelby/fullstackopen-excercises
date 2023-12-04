import { useEffect } from 'react'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'

const App = () => {
  const dispatch = useDispatch()
  const userSelector = (state) => state.user
  const user = useSelector(userSelector)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('LoggedInBlogListUser')
    if (!loggedUserJSON) return
    const userObject = JSON.parse(loggedUserJSON)
    dispatch(setUser(userObject))
    blogService.setToken(userObject.token)
  }, [])

  return (
    <Router>
      <Notification />
      {!user ? <Login /> : <Blogs />}
      <Routes>
        <Route path="/users" element={<Users />}></Route>
      </Routes>
    </Router>
  )
}

export default App
