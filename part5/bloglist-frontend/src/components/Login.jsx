export const Login = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (
    <>
      <form onSubmit={handleLogin}>
        <h2>Login to the application</h2>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </>
  )
}

export default Login