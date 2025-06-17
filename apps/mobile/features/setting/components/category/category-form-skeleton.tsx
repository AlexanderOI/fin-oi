import { View, ScrollView } from 'react-native'
import { Skeleton } from '@/components/ui/skeleton'

const SkeletonIcon = () => {
  return <Skeleton className="w-12 h-12 rounded-full" />
}

export const CategoryFormSkeleton = () => {
  return (
    <View>
      <Skeleton className="w-1/2 h-5 mb-2" />

      <Skeleton className="w-full h-14 mb-4" />
      <View className="gap-4 mb-4">
        <Skeleton className="w-1/2 h-5 mb-2" />
        <View className="flex-row items-center justify-center flex-wrap gap-3">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
          >
            <SkeletonIcon />
            <SkeletonIcon />
            <SkeletonIcon />
            <SkeletonIcon />
            <SkeletonIcon />
            <SkeletonIcon />
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
                  <SkeletonIcon />
                  <SkeletonIcon />
                  <SkeletonIcon />
                  <SkeletonIcon />
                  <SkeletonIcon />
                  <SkeletonIcon />
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
