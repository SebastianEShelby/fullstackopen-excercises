const totalLikes = (blogs) => {
  if (!blogs.length) return 0
  return blogs.reduce((acc, curr) => (acc + curr.likes), 0)
}

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

module.exports = {
  dummy,
  totalLikes
}