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
  ScrollView,
} from 'react-native'
import { Link, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useAuth } from '@/features/auth/hooks/useAuth'

import { Colors } from '@/constants/Colors'
import { Header } from '@/features/auth/components/header'
import { AuthIcon } from '@/features/auth/components/auth-icon'
import { InputContainer } from '@/features/auth/components/input-container'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const registerSchema = z
  .object({
    username: z
      .string({ required_error: 'El nombre es requerido' })
      .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
      .refine(data => !data.includes(' '), {
        message: 'El nombre no debe contener espacios',
      }),
    email: z
      .string({ required_error: 'El correo electrónico es requerido' })
      .email({ message: 'El correo electrónico no es válido' }),
    password: z
      .string({ required_error: 'La contraseña es requerida' })
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    confirmPassword: z
      .string({ required_error: 'La confirmación de contraseña es requerida' })
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
  })
  .refine(data => data.confirmPassword === data.password, {
    path: ['confirmPassword'],
    message: 'Las contraseñas no coinciden',
  })

type RegisterForm = z.infer<typeof registerSchema>

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const { register: handleRegister, login: handleLogin, checkUserData } = useAuth()

  const onSubmit = form.handleSubmit(async data => {
    const response = await checkUserData(data.username, data.email)
    if (response.username) {
      form.setError('username', { message: response.username })
      return
    }
    if (response.email) {
      form.setError('email', { message: response.email })
      return
    }

    try {
      const response = await handleRegister(
        data.username,
        data.email,
        data.password,
        data.confirmPassword,
      )

      if (!response) return

      const loginResponse = await handleLogin(data.username, data.password)
      if (!loginResponse) return

      router.push('/')
    } catch (error) {
      console.error('Error en el registro:', error)
    }
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
                  name="email"
                  render={({
                    field: { onChange, value, ...field },
                    fieldState: { error },
                  }) => (
                    <FormItem>
                      <InputContainer error={error?.message}>
                        <AuthIcon name="mail-outline" />
                        <FormControl
                          placeholder="Correo electrónico"
                          keyboardType="email-address"
                          autoCapitalize="none"
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

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({
                    field: { onChange, value, ...field },
                    fieldState: { error },
                  }) => (
                    <FormItem>
                      <InputContainer error={error?.message}>
                        <AuthIcon name="lock-closed-outline" />
                        <FormControl
                          placeholder="Confirmar contraseña"
                          onChangeText={onChange}
                          value={value}
                          secureTextEntry={!showConfirmPassword}
                          {...field}
                        />
                        <TouchableOpacity
                          className="p-2"
                          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          <AuthIcon
                            name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                          />
                        </TouchableOpacity>
                      </InputContainer>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <TouchableOpacity
                  className="bg-primary rounded-2xl h-14 items-center justify-center shadow-lg"
                  onPress={onSubmit}
                  activeOpacity={0.8}
                >
                  <Text className="text-white text-lg font-bold">Registrarse</Text>
                </TouchableOpacity>
              </View>
            </Form>

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
