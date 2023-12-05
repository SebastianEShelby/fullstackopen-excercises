import { useEffect, useState } from 'react'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { Routes, Route, useMatch } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import NavigationMenu from './components/NavigationMenu'

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

  return (
    <div className="container mb-5">
      <NavigationMenu user={user} />
      <Notification />
      {!user ? (
        <Login />
      ) : (
        <div>
          <h1 className="mt-1 mb-5">Blogs</h1>
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
    </div>
  )
}

export default App
