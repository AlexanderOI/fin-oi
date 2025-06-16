import { useEffect } from 'react'
import { router, Stack } from 'expo-router'
import { useAuth } from '@/features/auth/hooks/useAuth'

export default function AuthLayout() {
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      router.replace('/(app)')
    }
  }, [user])

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  )
}
