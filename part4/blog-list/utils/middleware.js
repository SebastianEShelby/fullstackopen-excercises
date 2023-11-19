const logger = require('./logger')
const mongodbErrorHelper = require('./mongodb-error-helper')

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

module.exports = {
  errorHandler
}