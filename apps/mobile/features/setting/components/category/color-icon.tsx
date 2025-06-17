import { TouchableOpacity } from 'react-native'

interface Props {
  color: string
  onPress: (color: string) => void
}

export const ColorIcon = ({ color, onPress }: Props) => {
  return (
    <TouchableOpacity
      className="w-12 h-12 rounded-full items-center justify-center"
      style={{
        backgroundColor: color,
      }}
      onPress={() => onPress(color)}
    />
  )
}
