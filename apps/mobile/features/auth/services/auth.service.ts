import axios from 'axios'
import { API_URL } from '@/config/env'

interface LoginCredentials {
  username: string
  password: string
}

interface RegisterCredentials {
  username: string
  email: string
  password: string
  name: string
}

interface AuthResponse {
  user: {
    id: string
    name: string
    username: string
    email: string
    avatar?: string
  }
  backendTokens: {
    accessToken: string
    refreshToken: string
    expiresIn: number
  }
}

export const authService = {
  baseUrl: `${API_URL}/auth`,

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axios.post(`${this.baseUrl}/login`, credentials)
    return response.data
  },

  async register(credentials: RegisterCredentials): Promise<{ message: string }> {
    try {
      const response = await axios.post(`${this.baseUrl}/register`, credentials)
      return response.data
    } catch (error) {
      console.error('Error en el registro:', error)
      if (axios.isAxiosError(error)) {
        console.error('Detalles del error:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        })
      }
      throw error
    }
  },

  async refreshToken(refreshToken: string): Promise<{
    accessToken: string
    refreshToken: string
    expiresIn: number
  }> {
    const response = await axios.post(
      `${this.baseUrl}/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    )
    return response.data
  },

  async checkUserData(username?: string, email?: string): Promise<{ message: string }> {
    const params = new URLSearchParams()
    if (username) params.append('userName', username)
    if (email) params.append('email', email)

    const response = await axios.get(
      `${this.baseUrl}/check-user-data?${params.toString()}`,
    )
    return response.data
  },
}
