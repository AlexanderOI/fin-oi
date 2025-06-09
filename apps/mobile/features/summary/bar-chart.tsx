import { View, Text, StyleSheet, Dimensions } from 'react-native'

interface BarChartProps {
  data: {
    month: string
    income: number
    expenses: number
  }[]
}

const windowWidth = Dimensions.get('window').width

export const BarChart = ({ data }: BarChartProps) => {
  const maxValue = Math.max(...data.map(item => Math.max(item.income, item.expenses)))

  const getBarHeight = (value: number) => {
    return (value / maxValue) * 200
  }

  return (
    <View style={styles.barChartContainer}>
      <View style={styles.barChart}>
        {data.map((item, index) => (
          <View key={index} style={styles.barGroup}>
            <View style={styles.barLabelContainer}>
              <Text style={styles.barLabel}>{item.month}</Text>
            </View>

            <View style={styles.barsContainer}>
              <View style={styles.barItem}>
                <View
                  style={[
                    styles.bar,
                    styles.incomeBar,
                    { height: getBarHeight(item.income) },
                  ]}
                />
              </View>

              <View style={styles.barItem}>
                <View
                  style={[
                    styles.bar,
                    styles.expensesBar,
                    { height: getBarHeight(item.expenses) },
                  ]}
                />
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.chartLegend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#84cc16' }]} />
          <Text style={styles.legendText}>Ingresos</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#f43f5e' }]} />
          <Text style={styles.legendText}>Gastos</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  barChartContainer: {
    height: 280,
  },
  barChart: {
    height: 220,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 20,
  },

  incomeBar: {
    backgroundColor: '#84cc16',
  },
  expensesBar: {
    backgroundColor: '#f43f5e',
  },

  barGroup: {
    alignItems: 'center',
    flex: 1,
  },
  barLabelContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  barLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 6,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: '100%',
  },
  barItem: {
    width: (windowWidth - 140) / (6 * 3), // TODO: cambiar a monthlyData.length
    marginHorizontal: 2,
    alignItems: 'center',
  },
  bar: {
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#64748b',
  },
})
