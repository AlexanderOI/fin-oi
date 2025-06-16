import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { SettingItem } from '@/features/setting/components/setting-item'
import { SectionHeader } from '@/features/setting/components/setion-header.tsx'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { router } from 'expo-router'

export default function SettingsScreen() {
  const { logout } = useAuth()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ajustes</Text>
        </View>

        <TouchableOpacity style={styles.profileCard}>
          <Image
            source={require('@/assets/images/avatar.png')}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Carlos Rodríguez</Text>
            <Text style={styles.profileEmail}>carlos.rodriguez@gmail.com</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#94a3b8" />
        </TouchableOpacity>

        <SectionHeader title="Cuenta" />

        <View style={styles.settingsGroup}>
          <SettingItem
            icon="person-outline"
            iconColor="#6366f1"
            title="Información personal"
            description="Nombre, email, contraseña"
          />

          <SettingItem
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
          />
        </View>

        <SectionHeader title="Privacidad" />

        <View style={styles.settingsGroup}>
          <SettingItem
            icon="lock-closed-outline"
            iconColor="#ec4899"
            title="Seguridad"
            description="Contraseña y autenticación"
          />

          <SettingItem
            icon="shield-outline"
            iconColor="#0ea5e9"
            title="Privacidad de datos"
            description="Uso de datos y permisos"
          />

          <SettingItem
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
          />
        </View>

        <SectionHeader title="Preferencias" />

        <View style={styles.settingsGroup}>
          <SettingItem
            icon="cash-outline"
            iconColor="#14b8a6"
            title="Moneda"
            description="EUR - Euro"
          />

          <SettingItem
            icon="globe-outline"
            iconColor="#6366f1"
            title="Idioma"
            description="Español"
          />

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

        <View style={styles.settingsGroup}>
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

        <SectionHeader title="Soporte" />

        <View style={styles.settingsGroup}>
          <SettingItem
            icon="help-circle-outline"
            iconColor="#84cc16"
            title="Centro de ayuda"
          />

          <SettingItem
            icon="chatbox-outline"
            iconColor="#6366f1"
            title="Contactar soporte"
          />
        </View>

        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Ionicons name="log-out-outline" size={20} color="#f43f5e" />
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>

          <Text style={styles.versionText}>FinanzApp v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#64748b',
  },
  settingsGroup: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },

  logoutContainer: {
    paddingTop: 8,
    paddingBottom: 32,
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#f43f5e',
    marginLeft: 8,
  },
  versionText: {
    marginTop: 16,
    fontSize: 12,
    color: '#94a3b8',
  },
})
