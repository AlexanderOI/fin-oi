import { Ionicons } from '@expo/vector-icons'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native'

interface Props extends TouchableOpacityProps {
  icon: keyof typeof Ionicons.glyphMap
  iconColor: string
  title: string
  description?: string
  rightElement?: React.ReactNode
}

export const SettingItem = ({
  icon,
  iconColor,
  title,
  description,
  rightElement,
  ...props
}: Props) => (
  <TouchableOpacity style={styles.settingItem} {...props}>
    <View style={[styles.settingIcon, { backgroundColor: `${iconColor}15` }]}>
      <Ionicons name={icon} size={20} color={iconColor} />
    </View>

    <View style={styles.settingInfo}>
      <Text style={styles.settingTitle}>{title}</Text>
      {description && <Text style={styles.settingDescription}>{description}</Text>}
    </View>

    <View style={styles.settingAction}>
      {rightElement || <Ionicons name="chevron-forward" size={20} color="#94a3b8" />}
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  settingAction: {
    marginLeft: 12,
  },
})
