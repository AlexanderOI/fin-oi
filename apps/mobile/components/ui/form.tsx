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
      <View style={[{ marginBottom: 16 }, style]} {...props}>
        {children}
      </View>
    </FormItemContext.Provider>
  )
}

export const FormLabel = ({ children, style, ...props }: TextProps) => {
  const { error } = useFormField()
  return (
    <Text
      style={[
        { fontWeight: 'bold', marginBottom: 4, color: error ? 'red' : '#333' },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  )
}

export const FormControl = (props: TextInputProps) => {
  const { error } = useFormField()
  return (
    <TextInput
      className="flex-1 text-base text-gray-700"
      placeholderTextColor={Colors.light.blueGray}
      style={[
        {
          borderWidth: 0,
          borderColor: error ? 'red' : '#ccc',
          borderRadius: 8,
          padding: 0,
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
