const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  if (blogs.length === 1) return {
    author: blogs[0].author,
    likes: blogs[0].likes
  }

  const blogsByAuthorArr = []
  let mostLikesCount = 0



  blogs.forEach(blog => {
    if (!blogsByAuthorArr.length) {
      blogsByAuthorArr.push({
        author: blog.author,
        likes: blog.likes
      })
      mostLikesCount = blog.likes
      return
    }

    const blogByAuthorIndex = blogsByAuthorArr.findIndex(obj => obj.author === blog.author)

    if (blogByAuthorIndex >= 0) {
      let blogByAuthorLikes = blogsByAuthorArr[blogByAuthorIndex].likes + blog.likes
      blogsByAuthorArr[blogByAuthorIndex].likes = blogByAuthorLikes
      if (blogByAuthorLikes > mostLikesCount) mostLikesCount = blogByAuthorLikes
      return
    }

    blogsByAuthorArr.push({
      author: blog.author,
      likes: blog.likes
    })
  })

  return blogsByAuthorArr.find(obj => obj.likes === mostLikesCount)
}

const mostBlogs = (blogs) => {

  if (blogs.length === 0) return null

  if (blogs.length === 1) return {
    author: blogs[0].author,
    blogs: 1
  }

  const blogsByAuthorArr = []
  let mostBlogsCount = 0

  blogs.forEach(blog => {
    if (!blogsByAuthorArr.length) {
      blogsByAuthorArr.push({
        author: blog.author,
        blogs: 1
      })
      mostBlogsCount = 1
      return
    }

    const blogByAuthorIndex = blogsByAuthorArr.findIndex(obj => obj.author === blog.author)

    if (blogByAuthorIndex >= 0) {
      let blogByAuthorBlogsCount = blogsByAuthorArr[blogByAuthorIndex].blogs + 1
      blogsByAuthorArr[blogByAuthorIndex].blogs = blogByAuthorBlogsCount
      if (blogByAuthorBlogsCount > mostBlogsCount) mostBlogsCount = blogByAuthorBlogsCount
      return
    }

    blogsByAuthorArr.push({
      author: blog.author,
      blogs: 1
    })
  })


  return blogsByAuthorArr.find(obj => obj.blogs === mostBlogsCount)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  let mostLikes = 0
  let blogWithMostLikes = null

  if (blogs.length === 1) {
    blogWithMostLikes = blogs[0]
  } else {
    blogs.forEach(blog => {
      if (blog.likes <= mostLikes && mostLikes) return
      mostLikes = blog.likes
      blogWithMostLikes = blog
    })
  }

  blogWithMostLikes = {
    title: blogWithMostLikes.title,
    author: blogWithMostLikes.author,
    likes: blogWithMostLikes.likes
  }

  return blogWithMostLikes
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0

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
  favoriteBlog,
  mostBlogs,
  mostLikes
}