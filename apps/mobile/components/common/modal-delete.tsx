import { TouchableOpacity, Text, View } from 'react-native'
import Modal from 'react-native-modal'

interface Props {
  isModalVisible: boolean
  title?: string
  message?: string
  onClose: () => void
  onDelete: () => void
}

export const ModalDelete = ({
  isModalVisible,
  title,
  message,
  onClose,
  onDelete,
}: Props) => {
  return (
    <Modal isVisible={isModalVisible} onBackdropPress={onClose}>
      <View className="bg-white rounded-2xl p-6 w-full max-w-md self-center">
        <View className="mb-4 items-center">
          <Text className="text-lg font-semibold text-red-600">
            {title || '¿Estás seguro?'}
          </Text>
          <Text className="text-center text-gray-600 mt-2">
            {message || '¿Estás seguro de querer eliminar este elemento?'}
          </Text>
        </View>

        <View className="flex-row justify-between space-x-3 mt-6">
          <TouchableOpacity
            onPress={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200"
          >
            <Text className="text-gray-700 font-medium">Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onDelete}
            className="px-4 py-2 rounded-lg bg-red-600"
          >
            <Text className="text-white font-medium">Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
