import ReactDOM from 'react-dom/client'
import App from './App'
import '../index.css'
import axiosInterceptor from './services/axios-interceptor'

axiosInterceptor();

ReactDOM.createRoot(document.getElementById('root')).render(<App />)