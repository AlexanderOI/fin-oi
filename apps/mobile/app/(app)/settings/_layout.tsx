import { Stack } from 'expo-router'

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Ajustes',
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#6366f1',
        }}
      />
      <Stack.Screen
        name="category/index"
        options={{
          title: 'Categorías',
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#6366f1',
        }}
      />
    </Stack>
  )
}
