import ReactDOM from 'react-dom/client'
import App from './App'
import '../index.css'
import axiosInterceptor from './services/axios-interceptor'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'

axiosInterceptor()

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
