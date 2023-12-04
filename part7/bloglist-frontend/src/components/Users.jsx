import { useEffect, useState } from 'react'
import usersService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    usersService.getAll().then((users) => {
      setUsers(users)
    })
  }, [])

  if (!users || users.length < 1) return <h2>No users found!</h2>

  return (
    <div>
      <h2>Users</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users
