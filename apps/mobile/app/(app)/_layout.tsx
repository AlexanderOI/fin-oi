import { useEffect } from 'react'
import { router, Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { IconName } from '@/global'

export default function AppLayout() {
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      router.replace('/(auth)/login')
    }
  }, [user])

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: IconName = 'home'

          if (route.name === 'index') {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === 'transactions') {
            iconName = focused ? 'list' : 'list-outline'
          } else if (route.name === 'summary') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline'
          } else if (route.name === 'settings') {
            iconName = focused ? 'settings' : 'settings-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#94a3b8',
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: '#ffffff',
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarItemStyle: {
          padding: 0,
        },
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarPressEffect: false,
        tabBarPressColor: 'transparent',
        tabBarPressOpacity: 1,
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Inicio' }} />
      <Tabs.Screen name="transactions" options={{ title: 'Transacciones' }} />
      <Tabs.Screen name="summary" options={{ title: 'Resumen' }} />
      <Tabs.Screen name="settings" options={{ title: 'Ajustes' }} />
    </Tabs>
  )
}
