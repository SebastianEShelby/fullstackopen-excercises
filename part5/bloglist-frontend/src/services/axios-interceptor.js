import axios from 'axios'
import blogService from './blogs.js'

const axiosInterceptor = () => axios.interceptors.response.use(
  response => {
    return response
  },
  (error) => {
    if (
      error?.response &&
      error.response.status === 401 &&
      error.response.data?.error.toLocaleLowerCase().match('expired')
    ) {
      window.localStorage.removeItem('LoggedInBlogListUser')
      blogService.setToken(null)
      window.location.reload()
      return Promise.reject(error)
    }

    return Promise.reject(error)
  }
)

export default axiosInterceptor