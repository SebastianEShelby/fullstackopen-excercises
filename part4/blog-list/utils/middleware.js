const logger = require('./logger')
const mongodbErrorHelper = require('./mongodb-error-helper')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
  logger.error('errorHandler', error.message)

  if (error.name === 'ValidationError') {
    return mongodbErrorHelper.handleValidationErrors(response, error)
  } else if (error.name === 'MongoServerError') {
    return mongodbErrorHelper.handleServerErrors(response, error)
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: 'JWT token must be provided with this request' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (request, response, next) => {
  // decodedToken includes username and id fields because that's how the token was signed originally in the login controller
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  if (!user) return response.status(400).json({ error: 'user invalid' })

  request.user = user

  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor
}