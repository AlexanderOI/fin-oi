import { View, Text, StyleSheet } from 'react-native'

interface Props {
  title: string
}

export const SectionHeader = ({ title }: Props) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
)

const styles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366f1',
  },
})
