export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000'
export const APP_NAME = process.env.EXPO_PUBLIC_APP_NAME || 'fin-oi'

export const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key]
  if (!value && defaultValue === undefined) {
    console.warn(`Variable de entorno ${key} no encontrada`)
  }
  return value || defaultValue || ''
}
