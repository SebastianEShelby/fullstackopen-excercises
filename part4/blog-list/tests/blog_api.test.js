const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  const initialBlogs = await helper.blogsInDb()
  if (initialBlogs.length) await Blog.deleteMany({})

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

test('if the likes property is missing from the request, it will default to the value 0', async () => {

  const blogWithoutLikes = {
    title: 'Testing blog http post',
    author: 'John Doe',
    url: 'https://duckduckgo.com/',
  }

  await api
    .post('/api/blogs')
    .send(blogWithoutLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const results = await helper.blogsInDb()
  const lastItemAdded = results.pop()

  expect(lastItemAdded.likes).toBeDefined()
  expect(lastItemAdded.likes).toBe(0)
})

test('if the title is missing from the request, backend responds with status code 400 Bad Request', async () => {

  const blogWithoutTitle = {
    author: 'John Doe',
    url: 'https://duckduckgo.com/',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)

  const results = await helper.blogsInDb()

  expect(results).toHaveLength(helper.initialBlogs.length)
})

test('if the url is missing from the request, backend responds with status code 400 Bad Request', async () => {

  const blogWithoutTitle = {
    title: 'Missing url',
    author: 'John Doe',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)

  const results = await helper.blogsInDb()

  expect(results).toHaveLength(helper.initialBlogs.length)
})

test('can delete a single blog post', async () => {

  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const ids = blogsAtEnd.map(r => r.id)

  expect(ids).not.toContain(blogToDelete.id)
})

test('can update an existing blog post', async () => {

  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const payload = {
    title: 'UPDATED Test Blog',
    author: 'UPDATED John Doe',
    url: 'updated.com',
    likes: 12
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(payload)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

  expect(updatedBlog).toEqual({ ...payload, id: blogToUpdate.id })
})


afterAll(async () => {
  await mongoose.connection.close()
})