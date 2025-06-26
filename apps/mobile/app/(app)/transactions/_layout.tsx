import { Stack } from 'expo-router'

export default function TransactionsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Transacciones',
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#6366f1',
        }}
      />
      <Stack.Screen
        name="new/index"
        options={{
          title: 'Nueva Transacción',
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#6366f1',
        }}
      />
    </Stack>
  )
}
