const handleServerErrors = (response, error) => {
  return response.status(500).json({ error: error.message })
}

const handleValidationErrors = (response, error) => {
  if (error?.errors['username']?.kind === 'unique') {
    return response.status(400).json({ error: 'Username is already in use! Please try a different username' })
  }
  return response.status(400).json({ error: error.message })
}

module.exports = {
  handleServerErrors,
  handleValidationErrors
}