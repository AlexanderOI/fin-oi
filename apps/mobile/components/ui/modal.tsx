import React, { useRef } from 'react'
import { View, Text, PanResponder, Animated } from 'react-native'
import Modal from 'react-native-modal'
import { Colors } from '@/constants/Colors'

interface ModalProps {
  visible: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  isLoading?: boolean
  skeleton?: React.ReactNode
}

export function ModalComponent({
  visible,
  onClose,
  title,
  children,
  isLoading,
  skeleton,
}: ModalProps) {
  const panY = useRef(new Animated.Value(0)).current

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 10,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy)
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          onClose()
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: false,
          }).start()
        }
      },
    }),
  ).current

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      propagateSwipe
      swipeDirection={[]}
    >
      <Animated.View
        style={{
          backgroundColor: Colors.light.background,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingHorizontal: 20,
          minHeight: '70%',
          transform: [{ translateY: panY }],
        }}
      >
        <View
          {...panResponder.panHandlers}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
        >
          <View
            style={{
              width: 80,
              height: 6,
              backgroundColor: '#ccc',
              borderRadius: 3,
            }}
          />
        </View>

        <View style={{ marginBottom: 15 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
            {title}
          </Text>
        </View>

        <View style={{ flex: 1 }}>{visible && isLoading ? skeleton : children}</View>
      </Animated.View>
    </Modal>
  )
}
