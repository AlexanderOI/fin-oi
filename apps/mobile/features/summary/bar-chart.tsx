import { View, Text, Dimensions } from 'react-native'

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
    <View className="h-[280px]">
      <View className="h-[220px] flex-row items-end justify-between pt-5">
        {data.map((item, index) => (
          <View key={index} style={{ flex: 1 }} className="items-center">
            <View className="absolute bottom-0 w-full items-center">
              <Text className="text-xs text-slate-500 mt-1.5">{item.month}</Text>
            </View>

            <View className="flex-row items-end h-full">
              <View style={{ width: (windowWidth - 140) / (6 * 3) }} className="mx-0.5 items-center">
                <View
                  className="w-full rounded-t bg-lime-500"
                  style={{ height: getBarHeight(item.income) }}
                />
              </View>

              <View style={{ width: (windowWidth - 140) / (6 * 3) }} className="mx-0.5 items-center">
                <View
                  className="w-full rounded-t bg-rose-500"
                  style={{ height: getBarHeight(item.expenses) }}
                />
              </View>
            </View>
          </View>
        ))}
      </View>

      <View className="flex-row justify-center mt-5">
        <View className="flex-row items-center mx-2.5">
          <View className="w-3 h-3 rounded-full mr-1.5 bg-lime-500" />
          <Text className="text-xs text-slate-500">Ingresos</Text>
        </View>
        <View className="flex-row items-center mx-2.5">
          <View className="w-3 h-3 rounded-full mr-1.5 bg-rose-500" />
          <Text className="text-xs text-slate-500">Gastos</Text>
        </View>
      </View>
    </View>
  )
}

