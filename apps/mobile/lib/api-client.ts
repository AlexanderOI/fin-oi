import axios from 'axios'

import { API_URL } from '@/config/env'
import { useAuthStore } from '@/features/auth/store/auth.store'

const apiClient = axios.create({
  baseURL: API_URL,
})
console.log(API_URL)
apiClient.interceptors.request.use(
  async config => {
    const { accessToken } = useAuthStore.getState()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

export { apiClient }
