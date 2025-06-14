import { View, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export function Header() {
  return (
    <View className="items-center mb-12">
      <MaterialCommunityIcons name="finance" size={100} color="#6366f1" />
      <Text className="text-5xl font-bold text-primary mb-2">FIN OI</Text>
      <Text className="text-gray-500">Control financiero simplificado</Text>
    </View>
  )
}
