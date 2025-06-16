import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '@/features/users/interfaces/user.interface'

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  expiresIn: number | null
  isAuthenticated: boolean
  setAuth: (
    user: User,
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
  ) => void
  logout: () => void
  updateUser: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      expiresIn: null,
      isAuthenticated: false,
      setAuth: (user, accessToken, refreshToken, expiresIn) =>
        set({
          user,
          accessToken,
          refreshToken,
          expiresIn,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          expiresIn: null,
          isAuthenticated: false,
        }),
      updateUser: user =>
        set(state => ({
          ...state,
          user,
        })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
