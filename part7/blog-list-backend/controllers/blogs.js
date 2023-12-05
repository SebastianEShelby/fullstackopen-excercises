const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const user = request.user
  const blog = new Blog({
    ...request.body,
    likes: request.body.likes || 0,
    user: user._id,
  })

  const savedBlog = await blog.save()
  const populatedBlog = await savedBlog.populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })

  user.blogs = user.blogs.concat(populatedBlog._id)
  await user.save()

  response.status(201).json(populatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user

  let blogToDelete = await Blog.findById(request.params.id)

  if (blogToDelete.user.toString() !== user.id)
    return response.status(401).json({
      error:
        'Unable to delete this blog since you are NOT the user who created it!',
    })

  await Blog.findByIdAndDelete(request.params.id)

  user.blogs = user.blogs.filter(
    (blogId) => blogId.toString() !== request.params.id,
  )
  await user.save()

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
    user: user._id,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  const populatedBlog = await updatedBlog.populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  response.status(201).json(populatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const user = request.user

  const blogToUpdate = await Blog.findById(request.params.id)

  const blog = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: blogToUpdate.likes,
    user: user._id,
    comments: blogToUpdate.comments.concat(body.comment),
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  const populatedBlog = await updatedBlog.populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })

  response.status(201).json(populatedBlog)
})

module.exports = blogsRouter
