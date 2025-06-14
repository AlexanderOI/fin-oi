import React, { useState } from 'react'
import {
  View,
  Text,
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
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { Header } from '@/features/auth/components/header'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { InputContainer } from '@/features/auth/components/input-container'
import { AuthIcon } from '@/features/auth/components/auth-icon'

const loginSchema = z.object({
  username: z.string().min(1, { message: 'El nombre de usuario es requerido' }),
  password: z.string().min(1, { message: 'La contraseña es requerida' }),
})

export default function LoginScreen() {
  const { login } = useAuth()

  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const handleLogin = form.handleSubmit(async data => {
    const response = await login(data.username, data.password)
    if (!response) {
      form.setError('username', { message: 'Credenciales incorrectas' })
      return
    }

    router.replace('/(app)')
  })

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

            <Form {...form}>
              <View className="w-full">
                <FormField
                  control={form.control}
                  name="username"
                  render={({
                    field: { onChange, value, ...field },
                    fieldState: { error },
                  }) => (
                    <FormItem>
                      <InputContainer error={error?.message}>
                        <AuthIcon name="person-outline" />
                        <FormControl
                          placeholder="Nombre"
                          onChangeText={onChange}
                          value={value}
                          {...field}
                        />
                      </InputContainer>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({
                    field: { onChange, value, ...field },
                    fieldState: { error },
                  }) => (
                    <FormItem>
                      <InputContainer error={error?.message}>
                        <AuthIcon name="lock-closed-outline" />
                        <FormControl
                          placeholder="Contraseña"
                          onChangeText={onChange}
                          value={value}
                          secureTextEntry={!showPassword}
                          {...field}
                        />
                        <TouchableOpacity
                          className="p-2"
                          onPress={() => setShowPassword(!showPassword)}
                        >
                          <AuthIcon
                            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                          />
                        </TouchableOpacity>
                      </InputContainer>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <TouchableOpacity style={styles.forgotPassword} onPress={() => {}}>
                <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity> */}

                <TouchableOpacity
                  className="bg-primary rounded-2xl h-14 items-center justify-center shadow-lg"
                  onPress={handleLogin}
                  activeOpacity={0.8}
                >
                  <Text className="text-white text-lg font-bold">Iniciar Sesión</Text>
                </TouchableOpacity>
              </View>
            </Form>

            <View className="flex-row mt-6">
              <Text className="text-gray-500 text-lg">¿No tienes una cuenta? </Text>
              <TouchableOpacity onPress={() => {}}>
                <Link href="/register" asChild>
                  <Text className="text-primary text-lg font-medium">Regístrate</Text>
                </Link>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
