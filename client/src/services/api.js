import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data)
}

export const workoutAPI = {
  create: (data) => api.post('/workouts', data),
  getAll: () => api.get('/workouts'),
  getById: (id) => api.get(`/workouts/${id}`),
  update: (id, data) => api.put(`/workouts/${id}`, data),
  delete: (id) => api.delete(`/workouts/${id}`)
}

export const goalAPI = {
  create: (data) => api.post('/goals', data),
  getAll: () => api.get('/goals'),
  getById: (id) => api.get(`/goals/${id}`),
  update: (id, data) => api.put(`/goals/${id}`, data),
  updateProgress: (id, data) => api.put(`/goals/${id}/progress`, data),
  delete: (id) => api.delete(`/goals/${id}`)
}

export default api
