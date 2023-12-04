import { useEffect, useState } from 'react'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { Routes, Route, useMatch, Link } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import { logout } from './reducers/userReducer'
import Blog from './components/Blog'

const App = () => {
  const [users, setUsers] = useState([])
  const dispatch = useDispatch()
  const usersSelector = (state) => state.user
  const user = useSelector(usersSelector)
  const blogsSelector = (state) => state.blogs
  const blogs = useSelector(blogsSelector)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('LoggedInBlogListUser')
    if (!loggedUserJSON) return
    const userObject = JSON.parse(loggedUserJSON)
    blogService.setToken(userObject.token)
    dispatch(setUser(userObject))
  }, [])

  const userMatch = useMatch('/users/:id')
  const matchedUser = userMatch
    ? users.find((user) => {
        return user.id === userMatch.params.id
      })
    : null

  const blogMatch = useMatch('/blogs/:id')
  const matchedBlog = blogMatch
    ? blogs.find((blog) => {
        return blog.id === blogMatch.params.id
      })
    : null

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      {user ? (
        <div>
          <Link className="link" to="/">
            blogs
          </Link>
          <Link className="link" to="/users">
            users
          </Link>
        </div>
      ) : null}
      <Notification />
      {!user ? (
        <Login />
      ) : (
        <div>
          <div>
            <h2>Blogs</h2>
            <p>
              {user.name} logged in &nbsp;
              <button onClick={() => handleLogout()}>logout</button>
            </p>
          </div>

          <Routes>
            <Route
              path="/blogs/:id"
              element={<Blog blog={matchedBlog} />}
            ></Route>
            <Route path="/" element={<Blogs />}></Route>
            <Route
              path="/users/:id"
              element={<User user={matchedUser} />}
            ></Route>
            <Route
              path="/users"
              element={<Users users={users} setUsers={setUsers} />}
            ></Route>
          </Routes>
        </div>
      )}
    </>
  )
}

export default App
