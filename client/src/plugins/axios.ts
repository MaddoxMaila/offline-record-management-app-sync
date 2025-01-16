import axios, { request } from 'axios'
import { useAuthStore } from '../stores/auth.store'
import router from '../router'


const axiosInstance = axios.create({
  baseURL: 'http://localhost:2828/api/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Request interceptor
axiosInstance.interceptors.request.use(request => {
  const authStore = useAuthStore()
  const token = authStore.auth.token
  if (token && request.headers) {
    request.headers.Authorization = `Bearer ${token}`
  }

  return request
})

// Response interceptor
axiosInstance.interceptors.response.use(response => response, error => {
  const authStore = useAuthStore()

  console.log(error.toString())
  const { status } = error.response

  if (status >= 500) {
    
  }

  if (status === 401 && authStore.auth.isLogged) {
  
    authStore.logout()
    router.push({ name: 'login' })

    return Promise.reject(error)
  }
})

export default axiosInstance