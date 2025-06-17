import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { categoriesIcons } from '@/features/setting/constants/categories'

interface Props {
  item: (typeof categoriesIcons)[0]
  color: string
  icon: string
  onPress: (icon: string) => void
}

export const IconRender = ({ item: category, color, icon, onPress }: Props) => {
  return (
    <TouchableOpacity
      key={category.icon}
      className="w-12 h-12 rounded-full items-center justify-center"
      onPress={() => onPress(category.icon)}
      style={{
        backgroundColor: color + '20',
        borderWidth: icon === category.icon ? 2 : 0,
        borderColor: color,
      }}
    >
      <Ionicons name={category.icon} color={color} size={24} />
    </TouchableOpacity>
  )
}
