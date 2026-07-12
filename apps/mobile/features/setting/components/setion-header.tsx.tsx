import { View, Text } from 'react-native'

interface Props {
  title: string
}

export const SectionHeader = ({ title }: Props) => (
  <View className="px-5 py-3">
    <Text className="text-base font-semibold text-primary">{title}</Text>
  </View>
)
