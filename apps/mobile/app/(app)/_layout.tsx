import { Redirect, Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '@/features/auth/hooks/useAuth'

export default function AppLayout() {
  const { user } = useAuth()

  if (!user) {
    return <Redirect href="/(auth)/login" />
  }

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home'

          if (route.name === 'index') {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === 'transactions') {
            iconName = focused ? 'list' : 'list-outline'
          } else if (route.name === 'summary/index') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline'
          } else if (route.name === 'settings/index') {
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
      <Tabs.Screen name="summary/index" options={{ title: 'Resumen' }} />
      <Tabs.Screen name="settings/index" options={{ title: 'Ajustes' }} />
    </Tabs>
  )
}
