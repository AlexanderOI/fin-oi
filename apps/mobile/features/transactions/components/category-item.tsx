import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Category } from '../interfaces/category.interfaces'

interface Props {
  category: Category
  isSelected: boolean
  onSelect: (category: Category) => void
}

export const CategoryItem = ({ category, isSelected, onSelect }: Props) => (
  <TouchableOpacity
    style={[
      styles.categoryItem,
      isSelected && {
        backgroundColor: `${category.color}20`,
        borderColor: category.color,
      },
    ]}
    onPress={() => onSelect(category)}
  >
    <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
      <Ionicons name={category.icon} size={24} color="#ffffff" />
    </View>
    <Text
      style={[
        styles.categoryName,
        isSelected && { color: category.color, fontWeight: '500' },
      ]}
    >
      {category.name}
    </Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    width: 100,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
})
