import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { logout } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'

const NavigationMenu = () => {
  const usersSelector = (state) => state.user
  const user = useSelector(usersSelector)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  if (!user) return null
  return (
    <Navbar
      bg="primary"
      data-bs-theme="dark"
      sticky="top"
      collapseOnSelect
      expand="lg"
    >
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="container">
          <Nav.Link as="div">
            <Link className="nav-link" to="/">
              Blogs
            </Link>
          </Nav.Link>
          <Nav.Link className="me-auto" as="div">
            <Link className="nav-link" to="/users">
              Users
            </Link>
          </Nav.Link>
          <Nav.Link as="div">
            <i className="nav-link"> {user.name} logged in</i>
          </Nav.Link>
          <Button
            className="ml-4 nav-link"
            size="sm"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationMenu
