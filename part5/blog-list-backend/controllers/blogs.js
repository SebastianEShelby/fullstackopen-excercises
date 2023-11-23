const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const user = request.user
  const blog = new Blog({
    ...request.body,
    likes: request.body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  savedBlog.populate('user', { username: 1, name: 1, id: 1 })

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user

  let blogToDelete = await Blog.findById(request.params.id)

  if (blogToDelete.user.toString() !== user.id) return response.status(401).json({ error: 'Unable to delete this blog since you are NOT the user who created it!' })

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  updatedBlog.populate('user', { username: 1, name: 1, id: 1 })

  user.blogs = user.blogs.concat(updatedBlog._id)
  await user.save()

  response.status(201).json(updatedBlog)
})

module.exports = blogsRouter