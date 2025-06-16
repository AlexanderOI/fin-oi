import { Stack } from 'expo-router'

export default function SummaryLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Resumen',
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#6366f1',
        }}
      />
    </Stack>
  )
}
