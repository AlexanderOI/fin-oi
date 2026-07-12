import { View, Text, ScrollView, TouchableOpacity, Switch, Image } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import { useAuth } from '@/features/auth/hooks/useAuth'
import { SettingItem } from '@/features/setting/components/setting-item'
import { SectionHeader } from '@/features/setting/components/setion-header.tsx'

import { AppSafeAreaView } from '@/components/common/app-safe-area-view'

export default function SettingsScreen() {
  const { user, logout } = useAuth()

  return (
    <AppSafeAreaView className="flex-1">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5 py-4">
          <Text className="text-2xl font-bold text-slate-800">Ajustes</Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push('/settings/personal-info')}
          className="flex-row items-center bg-white mx-5 my-4 p-4 rounded-2xl shadow-sm elevation-2"
        >
          <Image
            source={require('@/assets/images/avatar.png')}
            className="w-[60px] h-[60px] rounded-full mr-4"
          />
          <View className="flex-1">
            <Text className="text-lg font-bold text-slate-800 mb-1">{user?.name}</Text>
            <Text className="text-sm text-slate-500">{user?.email}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#94a3b8" />
        </TouchableOpacity>

        <SectionHeader title="Cuenta" />
        <View className="bg-white rounded-2xl mx-5 mb-6 shadow-sm elevation-2 overflow-hidden">
          <SettingItem
            onPress={() => router.push('/settings/personal-info')}
            icon="person-outline"
            iconColor="#6366f1"
            title="Información personal"
            description="Nombre, usuario, email"
          />
          {/* <SettingItem
            icon="card-outline"
            iconColor="#f59e0b"
            title="Métodos de pago"
            description="Tarjetas y cuentas bancarias"
          />
          <SettingItem
            icon="notifications-outline"
            iconColor="#84cc16"
            title="Notificaciones"
            description="Alertas y recordatorios"
            rightElement={
              <Switch
                trackColor={{ false: '#e2e8f0', true: '#c4b5fd' }}
                thumbColor={true ? '#8b5cf6' : '#f4f3f4'}
                value={true}
              />
            }
          /> */}
        </View>

        <SectionHeader title="Privacidad" />
        <View className="bg-white rounded-2xl mx-5 mb-6 shadow-sm elevation-2 overflow-hidden">
          <SettingItem
            icon="lock-closed-outline"
            iconColor="#ec4899"
            title="Seguridad"
            description="Contraseña y autenticación"
          />
          {/* <SettingItem
            icon="shield-outline"
            iconColor="#0ea5e9"
            title="Privacidad de datos"
            description="Uso de datos y permisos"
          /> */}
          {/* <SettingItem
            icon="finger-print-outline"
            iconColor="#8b5cf6"
            title="Autenticación biométrica"
            rightElement={
              <Switch
                trackColor={{ false: '#e2e8f0', true: '#c4b5fd' }}
                thumbColor={false ? '#8b5cf6' : '#f4f3f4'}
                value={false}
              />
            }
          /> */}
        </View>

        <SectionHeader title="Preferencias" />
        <View className="bg-white rounded-2xl mx-5 mb-6 shadow-sm elevation-2 overflow-hidden">
          {/* <SettingItem
            icon="cash-outline"
            iconColor="#14b8a6"
            title="Moneda"
            description="EUR - Euro"
          /> */}
          <SettingItem
            icon="moon-outline"
            iconColor="#8b5cf6"
            title="Tema oscuro"
            rightElement={
              <Switch
                trackColor={{ false: '#e2e8f0', true: '#c4b5fd' }}
                thumbColor={false ? '#8b5cf6' : '#f4f3f4'}
                value={false}
              />
            }
          />
        </View>

        <SectionHeader title="Gestión de datos" />
        <View className="bg-white rounded-2xl mx-5 mb-6 shadow-sm elevation-2 overflow-hidden">
          <SettingItem
            onPress={() => router.push('/settings/category')}
            icon="file-tray-full-outline"
            iconColor="#f59e0b"
            title="Categorías"
            description="Personalizar categorías"
          />
          <SettingItem
            icon="cloud-upload-outline"
            iconColor="#0ea5e9"
            title="Exportar datos"
            description="CSV, PDF"
          />
        </View>

        <View className="pt-2 pb-8 items-center">
          <TouchableOpacity className="flex-row items-center py-3 px-6" onPress={logout}>
            <Ionicons name="log-out-outline" size={20} color="#f43f5e" />
            <Text className="text-base font-medium text-rose-500 ml-2">
              Cerrar sesión
            </Text>
          </TouchableOpacity>
          <Text className="mt-4 text-xs text-slate-400">FIN-OI v0.0.1</Text>
        </View>
      </ScrollView>
    </AppSafeAreaView>
  )
}
