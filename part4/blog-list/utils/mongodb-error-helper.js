const handleServerErrors = (response, error) => {
  if (error.message.match('E11000') && error.message.match('username')) {
    return response.status(400).json({ error: 'Username is already in use! Please try a different username' })
  }

  return response.status(500).json({ error: error.message })
}

const handleValidationErrors = (response, error) => {
  return response.status(400).json({ error: error.message })
}

module.exports = {
  handleServerErrors,
  handleValidationErrors
}