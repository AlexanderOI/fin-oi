import React, { createContext, useState, useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import ModalRN from 'react-native-modal'
import { Colors } from '@/constants/Colors'

interface ModalContextType {
  isVisible: boolean
  openModal: () => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal use with in a ModalProvider')
  }
  return context
}

interface ModalProviderProps {
  children: React.ReactNode
}

export const Modal = ({ children }: ModalProviderProps) => {
  const [isVisible, setIsVisible] = useState(false)

  const openModal = () => setIsVisible(true)
  const closeModal = () => setIsVisible(false)

  return (
    <ModalContext.Provider value={{ isVisible, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

interface ModalProps {
  visible?: boolean
  onClose?: () => void
  title: string
  children: React.ReactNode
  showChildrenOnModalShow?: boolean
  skeleton?: React.ReactNode
}

export function ModalContent({
  visible: externalVisible,
  onClose: externalOnClose,
  title,
  children,
  skeleton,
  showChildrenOnModalShow = true,
}: ModalProps) {
  const [isContentVisible, setIsContentVisible] = useState(showChildrenOnModalShow)
  const { isVisible: contextVisible, closeModal: contextCloseModal } = useModal()

  const isVisible = externalVisible ?? contextVisible
  const handleClose = externalOnClose ?? contextCloseModal

  return (
    <ModalRN
      isVisible={isVisible}
      onBackdropPress={handleClose}
      onSwipeComplete={handleClose}
      onModalShow={() => {
        setIsContentVisible(true)
      }}
      onModalHide={() => {
        setIsContentVisible(false)
      }}
      swipeDirection="down"
      style={{ justifyContent: 'flex-end', margin: 0 }}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      propagateSwipe
    >
      <View
        className="rounded-t-3xl p-5 min-h-[70%]"
        style={{ backgroundColor: Colors.light.background }}
      >
        <View className="w-20 h-1.5 bg-gray-300 rounded-full self-center mb-4" />

        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold">{title}</Text>
          <TouchableOpacity onPress={handleClose}>
            <Text className="text-gray-500">Cerrar</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1">
          {isContentVisible && isVisible && children}
          {skeleton && !isContentVisible && isVisible && skeleton}
        </View>
      </View>
    </ModalRN>
  )
}
