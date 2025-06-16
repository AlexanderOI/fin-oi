import { View, ViewProps, StyleSheet } from 'react-native'
import { cn } from '@/lib/cn'

export const Card = ({ children, className, ...props }: ViewProps) => (
  <View
    className={cn(
      'bg-white rounded-2xl p-4 shadow-lg flex-row items-center border border-gray-200',
      'mb-4',
      className,
    )}
    style={styles.card}
    {...props}
  >
    {children}
  </View>
)

const styles = StyleSheet.create({
  card: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
})
