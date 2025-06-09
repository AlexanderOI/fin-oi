import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Toaster } from 'sonner-native'
import { StyleSheet } from 'react-native'

import '../global.css'

export default function RootLayout() {
  return (
    <SafeAreaProvider style={styles.container}>
      <Toaster />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
      </Stack>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    userSelect: 'none',
  },
})
