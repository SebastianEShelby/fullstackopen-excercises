const favoriteBlog = (blogs) => {
  if (!blogs.length) return null

  if (blogs.length === 1) return {
    title: blogs[0].title,
    author: blogs[0].author,
    likes: blogs[0].likes
  }

  let mostLikes = 0
  let blogWithMostLikes = null

  blogs.forEach(blog => {
    if (blog.likes <= mostLikes && mostLikes) return
    mostLikes = blog.likes
    blogWithMostLikes = blog
  })

  blogWithMostLikes = {
    title: blogWithMostLikes.title,
    author: blogWithMostLikes.author,
    likes: blogWithMostLikes.likes
  }

  return blogWithMostLikes
}

const totalLikes = (blogs) => {
  if (!blogs.length) return 0

  if (blogs.length === 1) return blogs[0].likes

  return blogs.reduce((acc, curr) => (acc + curr.likes), 0)
}

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}