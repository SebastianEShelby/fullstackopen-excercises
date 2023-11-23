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
        {blog.url ? <p>Url: {blog.url}</p> : null}
        {blog.likes !== (null || undefined) ? <p>Likes: {blog.likes} <button>like</button></p> : null}
        {blog.user.name ? <p>User: {blog.user.name}</p> : null}
      </div >
    </div>
  )
}

export default Blog