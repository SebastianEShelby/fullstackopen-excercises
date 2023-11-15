const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObj = new Blog(blog)
    await blogObj.save()
  }
})

test('returns the correct amount of blog posts in the JSON format', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('a valid blog can be added', async () => {
  const initialBlogs = await helper.blogsInDb()

  const newBlog = {
    title: 'Testing blog http post',
    author: 'John Doe',
    url: 'https://duckduckgo.com/',
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const finalBlogs = await helper.blogsInDb()

  expect(finalBlogs).toHaveLength(initialBlogs.length + 1)

  const lastItemAdded = finalBlogs.pop()

  expect(lastItemAdded).toEqual({ ...newBlog, id: lastItemAdded.id })

})

afterAll(async () => {
  await mongoose.connection.close()
})