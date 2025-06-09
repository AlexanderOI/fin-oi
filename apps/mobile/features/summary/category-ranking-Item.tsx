import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { CategoryRanking } from '../transactions/interfaces/category.interfaces'

interface Props {
  category: CategoryRanking
  index: number
}

export const CategoryRankingItem = ({ category, index }: Props) => (
  <View style={styles.rankingItem}>
    <View style={styles.rankingPosition}>
      <Text style={styles.positionText}>{index + 1}</Text>
    </View>

    <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
      <Ionicons name={category.icon} size={16} color="#ffffff" />
    </View>

    <View style={styles.rankingInfo}>
      <Text style={styles.rankingName}>{category.name}</Text>
      <View style={styles.percentageContainer}>
        <View
          style={[
            styles.percentageBar,
            { width: `${category.percentage}%`, backgroundColor: category.color },
          ]}
        />
      </View>
    </View>

    <View style={styles.rankingAmount}>
      <Text style={styles.rankingAmountText}>{category.amount}€</Text>
      <Text style={styles.rankingPercentText}>{category.percentage}%</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  rankingPosition: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  positionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  categoryIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankingInfo: {
    flex: 1,
    marginRight: 12,
  },
  rankingName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 4,
  },

  percentageContainer: {
    height: 6,
    backgroundColor: '#f1f5f9',
    borderRadius: 3,
    overflow: 'hidden',
  },
  percentageBar: {
    height: '100%',
    borderRadius: 3,
  },
  rankingAmount: {
    alignItems: 'flex-end',
  },
  rankingAmountText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  rankingPercentText: {
    fontSize: 12,
    color: '#64748b',
  },
})
