import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(login({ username, password }))
  }

  return (
    <>
      <Form onSubmit={handleLogin}>
        <h2 className="mt-5 mb-5">Login to the application</h2>
        <FloatingLabel
          controlId="usernameInput"
          label="Username"
          className="mb-3"
        >
          <Form.Control
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="passwordInput"
          label="Password"
          className="mb-3"
        >
          <Form.Control
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </FloatingLabel>

        <Button type="submit">Login</Button>
      </Form>
    </>
  )
}

export default Login
