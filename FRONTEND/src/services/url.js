import api from './api'
export const createUrl = (data) => api.post('/create', data)
export const getUrls = () => api.post('/user/urls')
