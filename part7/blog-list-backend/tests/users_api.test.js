const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('Invalid users are not created', () => {

  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('Fails with status code 400 and error message if Username is too short', async () => {

    const invalidUserName = 'j'

    const newUser = {
      username: invalidUserName,
      password: '1234'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toBe('Username must be at least 3 characters long!')
  })


  test('Fails with status code 400 and error message if Password is too short', async () => {

    const invalidPassword = '1'

    const newUser = {
      username: 'john',
      password: invalidPassword
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toBe('Password must be at least 3 characters long!')
  })

  test('Fails with status code 400 and error message if the Username is NOT unique', async () => {

    const newUser = {
      username: 'john',
      password: '1234'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    const duplicateUser = {
      username: 'john',
      password: '1111'
    }

    const response = await api
      .post('/api/users')
      .send(duplicateUser)
      .expect(400)

    expect(response.body.error).toBe('Username is already in use! Please try a different username')
  })
})
