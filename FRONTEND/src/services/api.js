import axios from 'axios'
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api', withCredentials: true })
api.interceptors.request.use(c => { const token = localStorage.getItem('token'); if (token) c.headers.Authorization = `Bearer ${token}`; return c })
api.interceptors.response.use(r => r, e => Promise.reject(e?.response?.data?.message || 'Something went wrong. Please try again.'))
export default api
