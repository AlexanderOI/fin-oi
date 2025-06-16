// components/form/index.tsx
import React, { createContext, useContext, useId } from 'react'
import { View, Text, TextInput, TextInputProps, ViewProps, TextProps } from 'react-native'
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form'
import { Colors } from '@/constants/Colors'
import { cn } from '@/lib/cn'

// Contextos
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue)

const FormItemContext = createContext<{ id: string }>({} as { id: string })

// Hook para obtener información del campo
const useFormField = () => {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  return {
    id: itemContext.id,
    name: fieldContext.name,
    formItemId: `${itemContext.id}-form-item`,
    formMessageId: `${itemContext.id}-form-item-message`,
    error: fieldState.error,
  }
}

// Componentes base
export const Form = FormProvider

export const FormItem = ({ children, style, ...props }: ViewProps) => {
  const id = useId()
  return (
    <FormItemContext.Provider value={{ id }}>
      <View className={cn('mb-4', props.className)} style={style} {...props}>
        {children}
      </View>
    </FormItemContext.Provider>
  )
}

export const FormLabel = ({ children, style, ...props }: TextProps) => {
  const { error } = useFormField()
  return (
    <Text style={[{ marginBottom: 4, color: error ? 'red' : '#333' }, style]} {...props}>
      {children}
    </Text>
  )
}

interface FormControlProps extends TextInputProps {
  className?: string
  custom?: boolean
}

export const FormControl = ({ custom = false, ...props }: FormControlProps) => {
  const { error } = useFormField()
  return (
    <TextInput
      className={cn('text-base text-gray-700', props.className)}
      placeholderTextColor={Colors.light.blueGray}
      style={[
        {
          borderWidth: custom ? 0 : 1,
          borderColor: error ? 'red' : '#ccc',
          borderRadius: 8,
          padding: custom ? 0 : 10,
        },
        props.style,
      ]}
      {...props}
    />
  )
}

export const FormMessage = ({ style, ...props }: TextProps) => {
  const { error, formMessageId } = useFormField()
  if (!error) return null

  return (
    <Text
      style={[{ color: 'red', marginTop: 4, fontSize: 12 }, style]}
      nativeID={formMessageId}
      {...props}
    >
      {error.message?.toString()}
    </Text>
  )
}

// Campo con Controller
export function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}
