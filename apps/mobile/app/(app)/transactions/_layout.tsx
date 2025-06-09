import { Stack } from 'expo-router'

export default function TransactionsLayout() {
  return (
    <Stack>
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
        name="new"
        options={{
          title: 'Nueva Transacción',
          presentation: 'modal',
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#6366f1',
        }}
      />
    </Stack>
  )
}
