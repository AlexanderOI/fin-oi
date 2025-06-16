import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Toaster } from 'sonner-native'
import { StyleSheet, Text, View } from 'react-native'

import '../global.css'
import { useEffect, useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuth } from '@/features/auth/hooks/useAuth'

const queryClient = new QueryClient()

export default function RootLayout() {
  const { expiresIn = 0, refreshToken, logout } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!expiresIn) {
      logout()
    }

    if (expiresIn && new Date().getTime() > expiresIn) {
      refreshToken()
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider style={styles.container}>
        <Toaster />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(app)" />
        </Stack>
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    userSelect: 'none',
  },
})
