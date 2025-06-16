import { Ionicons } from '@expo/vector-icons'
import { View, Text, TouchableOpacity } from 'react-native'
import { Colors } from '@/constants/Colors'
import { IconName } from '@/global'

interface HeaderScreenProps {
  title: string
  icon?: IconName
  onPressIcon?: () => void
}

export const HeaderScreen = ({ title, icon, onPressIcon }: HeaderScreenProps) => {
  return (
    <View className="flex-row items-center justify-between px-6 py-1">
      <Text className="text-2xl font-bold">{title}</Text>
      {icon && (
        <TouchableOpacity
          className="bg-white rounded-full p-3"
          onPress={onPressIcon}
          style={{ backgroundColor: Colors.light.primary + '20' }}
        >
          <Ionicons name={icon} size={24} color={Colors.light.primary} />
        </TouchableOpacity>
      )}
    </View>
  )
}
