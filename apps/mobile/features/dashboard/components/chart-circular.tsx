import { StyleSheet, View } from 'react-native'
import { Category } from '../../transactions/interfaces/category.interfaces'

interface Props {
  category: Category
  total: number
  index: number
  segments: Category[]
}

export const PieChartSegment = ({ category, total, index, segments }: Props) => {
  const angle = (category.amount / total) * 360
  const startAngle = segments
    .slice(0, index)
    .reduce((sum, segment) => sum + (segment.amount / total) * 360, 0)

  return (
    <View
      style={[
        styles.pieSegment,
        {
          backgroundColor: category.color,
          transform: [
            { rotateZ: `${startAngle}deg` },
            {
              rotateY: angle <= 180 ? '0deg' : '180deg',
            },
          ],
          width: angle <= 180 ? '100%' : '50%',
          height: '100%',
          borderTopRightRadius: angle <= 180 ? 0 : 100,
          borderBottomRightRadius: angle <= 180 ? 0 : 100,
          right: angle <= 180 ? 0 : '50%',
          zIndex: segments.length - index,
        },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  pieSegment: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
})
