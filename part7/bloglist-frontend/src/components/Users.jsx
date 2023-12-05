import { useEffect } from 'react'
import usersService from '../services/users'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const Users = ({ users, setUsers }) => {
  useEffect(() => {
    usersService.getAll().then((users) => {
      setUsers(users)
    })
  }, [])

  if (!users || users.length < 1) return <h2>No users found!</h2>

  return (
    <div>
      <h2>Users</h2>

      <Table>
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
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
