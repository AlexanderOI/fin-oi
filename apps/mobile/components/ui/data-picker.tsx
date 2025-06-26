import { useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
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
      <TouchableOpacity style={styles.dateSelector} onPress={() => setShowPicker(true)}>
        <Ionicons
          name="calendar-outline"
          size={20}
          color="#64748b"
          style={styles.dateIcon}
        />
        <Text style={styles.dateText}>{formatDate(value)}</Text>
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

const styles = StyleSheet.create({
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  dateIcon: {
    marginRight: 12,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
  },
})
