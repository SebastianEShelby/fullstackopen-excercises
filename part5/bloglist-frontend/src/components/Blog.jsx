import { useState } from "react"

const Blog = ({ blog }) => {
  const [isDetailedView, setIsDetailedView] = useState(false)

  const toggleIsDetailedView = () => {
    setIsDetailedView(!isDetailedView)
  }

  const blogStyle = {
    padding: "10px 10px",
    border: '1px solid black',
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <>{blog.title} {blog.author} <button onClick={toggleIsDetailedView}>{isDetailedView ? "hide" : "view"}</button></>
      <div style={{ display: isDetailedView ? "" : "none" }}>
        <p>Url: {blog.url}</p>
        <p>Likes: {blog.likes} <button>like</button></p>
        <p>User: {blog.user.name}</p>
      </div >
    </div>
  )
}

export default Blog