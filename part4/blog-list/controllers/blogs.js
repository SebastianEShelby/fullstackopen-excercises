const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  // decodedToken includes username and id fields because that's how the token was signed originally in the login controller
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) return response.status(400).json({ error: 'No users found! Please create a user and login first before adding blogs' })

  const blog = new Blog({
    ...request.body,
    likes: request.body.likes || 0,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  // decodedToken includes username and id fields because that's how the token was signed originally in the login controller
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) return response.status(400).json({ error: 'No users found! Please create a user and login first before adding blogs' })

  let blogToDelete = await Blog.findById(request.params.id)

  if (blogToDelete.user.toString() !== user.id) return response.status(401).json({ error: 'Unable to delete this blog since you are NOT the user who created it!' })

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  console.error('request.params.id', request.params.id)
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(204).json(updatedBlog)
})

module.exports = blogsRouter