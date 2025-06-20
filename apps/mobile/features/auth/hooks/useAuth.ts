import { useState } from 'react'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { authService } from '@/features/auth/services/auth.service'
import { AxiosError } from 'axios'

export const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const { setAuth, logout, user, isAuthenticated, expiresIn, refreshToken } =
    useAuthStore()

  const handleLogin = async (username: string, password: string) => {
    try {
      setLoading(true)
      const response = await authService.login({ username, password })
      setAuth(
        response.user,
        response.backendTokens.accessToken,
        response.backendTokens.refreshToken,
        response.backendTokens.expiresIn,
      )
      return true
    } catch (err) {
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (
    username: string,
    email: string,
    password: string,
    name: string,
  ) => {
    try {
      setLoading(true)
      await authService.register({ username, email, password, name })
      return true
    } catch (err) {
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleRefreshToken = async () => {
    try {
      if (!user || !refreshToken) return logout()
      const response = await authService.refreshToken(refreshToken)
      setAuth(user, response.accessToken, response.refreshToken, response.expiresIn)
    } catch (err) {
      return logout()
    }
  }

  const handleLogout = () => {
    logout()
  }

  const checkUserData = async (username?: string, email?: string) => {
    try {
      setLoading(true)
      return await authService.checkUserData(username, email)
    } catch (err) {
      if (err instanceof AxiosError) {
        return err.response?.data
      } else {
        return err instanceof Error ? err.message : 'Error al verificar datos'
      }
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    isAuthenticated,
    expiresIn,
    loading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    checkUserData,
    refreshToken: handleRefreshToken,
  }
}
