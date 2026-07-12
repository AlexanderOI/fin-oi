import { useState } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { formatDate } from '@/lib/format-date'

interface Props {
  value: Date
  onChange: (date: Date) => void
}

export function DataPicker({ value, onChange }: Props) {
  const [showPicker, setShowPicker] = useState(false)

  const handleChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowPicker(false)
    if (date) {
      onChange(date)
    }
  }

  return (
    <View>
      <TouchableOpacity className="flex-row items-center bg-white rounded-xl p-4 border border-slate-200" onPress={() => setShowPicker(true)}>
        <Ionicons
          name="calendar-outline"
          size={20}
          color="#64748b"
          className="mr-3"
        />
        <Text style={{ flex: 1 }} className="text-base text-slate-800">{formatDate(value)}</Text>
        <Ionicons name="chevron-down-outline" size={16} color="#64748b" />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  )
}

