import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';

export default function BlurTabBarBackground() {
  return (
    <BlurView
      tint="systemChromeMaterial"
      intensity={100}
      className="absolute inset-0"
    />
  );
}

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}
