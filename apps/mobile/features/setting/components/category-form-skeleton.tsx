import { View, ScrollView } from 'react-native'
import { categoriesIcons, COLORS } from '@/features/setting/constants/categories'
import { Skeleton } from '@/components/ui/skeleton'

export const CategoryFormSkeleton = () => {
  return (
    <View>
      <Skeleton className="w-full h-14 mb-4" />
      <View className="gap-4 mb-4">
        <Skeleton className="w-1/2 h-5 mb-2" />
        <View className="flex-row items-center justify-center flex-wrap gap-3">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
          >
            {COLORS.map(color => (
              <Skeleton key={color} className="w-12 h-12 rounded-full" />
            ))}
          </ScrollView>
        </View>

        <View>
          <Skeleton className="w-1/2 h-5 mb-2" />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ height: 180 }}
          >
            <View className="gap-3">
              {[0, 1, 2].map(row => (
                <View key={row} className="flex-row gap-3">
                  {categoriesIcons.slice(row * 8, (row + 1) * 8).map(category => (
                    <Skeleton
                      key={category.icon}
                      className="w-12 h-12 rounded-full"
                    ></Skeleton>
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        <Skeleton className="w-full h-14" />
      </View>
    </View>
  )
}
