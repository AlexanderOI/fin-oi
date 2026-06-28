import { Ionicons } from '@expo/vector-icons'
import { View, TouchableOpacity, Text, TouchableOpacityProps } from 'react-native'

interface Props extends TouchableOpacityProps {
  icon: keyof typeof Ionicons.glyphMap
  iconColor: string
  title: string
  description?: string
  rightElement?: React.ReactNode
}

export const SettingItem = ({
  icon,
  iconColor,
  title,
  description,
  rightElement,
  ...props
}: Props) => (
  <TouchableOpacity
    className="flex-row items-center py-4 px-4 border-b border-slate-100"
    {...props}
  >
    <View
      className="w-10 h-10 rounded-xl items-center justify-center mr-4"
      style={{ backgroundColor: `${iconColor}15` }}
    >
      <Ionicons name={icon} size={20} color={iconColor} />
    </View>

    <View className="flex-1">
      <Text className="text-base font-medium text-slate-800 mb-0.5">{title}</Text>
      {description && <Text className="text-sm text-slate-500">{description}</Text>}
    </View>

    <View className="ml-3">
      {rightElement || <Ionicons name="chevron-forward" size={20} color="#94a3b8" />}
    </View>
  </TouchableOpacity>
)
