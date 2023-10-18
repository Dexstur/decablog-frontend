import axios from 'axios'

const { VITE_APP_NODE_ENV } = import.meta.env
const baseURL =
  VITE_APP_NODE_ENV === 'development'
    ? 'http://127.0.0.1:8080'
    : 'https://decablog16api.onrender.com/'
const myApi = axios.create({
  baseURL,
  withCredentials: true,
})
// console.log(VITE_APP_NODE_ENV)
myApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('blogtoken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default myApi
export { baseURL }
