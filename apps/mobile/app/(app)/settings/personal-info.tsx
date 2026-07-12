import { useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { router } from 'expo-router'
import { AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAuth } from '@/features/auth/hooks/useAuth'
import { useUpdateProfile } from '@/features/users/hooks/use-update-profile'
import { AppSafeAreaView } from '@/components/common/app-safe-area-view'
import { ScreenHeader } from '@/components/common/screen-header'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const schema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  username: z
    .string()
    .min(3, { message: 'El usuario debe tener al menos 3 caracteres' })
    .regex(/^\S*$/, { message: 'El usuario no puede contener espacios' }),
  email: z.string().email({ message: 'Ingresa un email válido' }),
})

type FormData = z.infer<typeof schema>

export default function PersonalInfoScreen() {
  const { user } = useAuth()
  const { mutate: updateProfile, isPending } = useUpdateProfile()

  const form = useForm<FormData>({
    defaultValues: {
      name: '',
      username: '',
      email: '',
    },
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
      })
    }
  }, [user])

  const handleSubmit = form.handleSubmit(data => {
    updateProfile(data, {
      onSuccess: () => {
        Alert.alert('Éxito', 'Información actualizada correctamente')
        router.back()
      },
      onError: error => {
        if (error instanceof AxiosError) {
          Alert.alert('Error', error.response?.data?.message || 'Error al actualizar')
        } else {
          Alert.alert('Error', 'Ocurrió un error inesperado')
        }
      },
    })
  })

  return (
    <AppSafeAreaView className="flex-1">
      <ScreenHeader title="Información personal" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Form {...form}>
          <View className="px-5 py-4 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({
                field: { onChange, value, ...field },
                fieldState: { error },
              }) => (
                <FormItem>
                  <FormLabel className="h-5">Nombre</FormLabel>
                  <FormControl
                    placeholder="Tu nombre"
                    onChangeText={onChange}
                    value={value}
                    className="h-14 m-0!"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({
                field: { onChange, value, ...field },
                fieldState: { error },
              }) => (
                <FormItem>
                  <FormLabel className="h-5">Usuario</FormLabel>
                  <FormControl
                    placeholder="Tu nombre de usuario"
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                    className="h-14 m-0!"
                    {...field}
                  />
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
                  <FormLabel className="h-5">Email</FormLabel>
                  <FormControl
                    placeholder="Tu email"
                    onChangeText={onChange}
                    value={value}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="h-14 m-0!"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <TouchableOpacity
              className="bg-primary rounded-2xl h-14 items-center justify-center mt-4"
              onPress={handleSubmit}
              disabled={isPending}
            >
              {isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-medium text-base">Guardar cambios</Text>
              )}
            </TouchableOpacity>
          </View>
        </Form>
      </ScrollView>
    </AppSafeAreaView>
  )
}
