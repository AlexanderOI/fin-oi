import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
} from 'react-native'
import { Link, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import Header from '@/features/auth/components/header'

export default function RegisterScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleRegister = () => {
    router.replace('/(app)')
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <SafeAreaView
            style={{ flex: 1 }}
            className="items-center justify-between px-6 pt-20 pb-6"
          >
            <Header />

            <View className="w-full">
              <View>
                <View className="flex-row items-center bg-white rounded-2xl mb-4 px-4 h-14 shadow-lg">
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={Colors.light.blueGray}
                    className="mr-3"
                  />
                  <TextInput
                    className="flex-1 text-base text-gray-700"
                    placeholder="Nombre"
                    placeholderTextColor={Colors.light.blueGray}
                    value={username}
                    onChangeText={setUsername}
                  />
                </View>
              </View>
              <View className="flex-row items-center bg-white rounded-2xl mb-4 px-4 h-14 shadow-lg">
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={Colors.light.blueGray}
                  className="mr-3"
                />
                <TextInput
                  className="flex-1 text-base text-gray-700"
                  placeholder="Correo electrónico"
                  placeholderTextColor={Colors.light.blueGray}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View className="flex-row items-center bg-white rounded-2xl mb-4 px-4 h-14 shadow-lg">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={Colors.light.blueGray}
                  className="mr-3"
                />
                <TextInput
                  className="flex-1 text-base text-gray-700"
                  placeholder="Contraseña"
                  placeholderTextColor={Colors.light.blueGray}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  className="p-2"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={Colors.light.blueGray}
                  />
                </TouchableOpacity>
              </View>

              <View className="flex-row items-center bg-white rounded-2xl mb-4 px-4 h-14 shadow-lg">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={Colors.light.blueGray}
                  className="mr-3"
                />
                <TextInput
                  className="flex-1 text-base text-gray-700"
                  placeholder="Confirmar contraseña"
                  placeholderTextColor={Colors.light.blueGray}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  className="p-2"
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={Colors.light.blueGray}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                className="bg-primary rounded-2xl h-14 items-center justify-center shadow-lg"
                onPress={handleRegister}
                activeOpacity={0.8}
              >
                <Text className="text-white text-lg font-bold">Registrarse</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row mt-6">
              <Text className="text-gray-500 text-lg">¿Ya tienes una cuenta? </Text>
              <TouchableOpacity onPress={() => {}}>
                <Link href="/login" asChild>
                  <Text className="text-primary text-lg font-medium">Iniciar Sesión</Text>
                </Link>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
