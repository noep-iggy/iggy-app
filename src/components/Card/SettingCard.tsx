import { genericStyles } from '@/constants';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';

interface SettingCardProps extends TouchableOpacityProps {
  icon?: string;
  title: string;
  description: string;
}

export function SettingCard(props: SettingCardProps): JSX.Element {
  const { title, icon, description, style } = props;
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[
        genericStyles.flexRow,
        {
          justifyContent: 'space-between',
          alignItems: 'center',
          shadowOffset: { width: 2, height: 3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          backgroundColor: colors.background,
          padding: 16,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: colors.outlineVariant,
        },
        style,
      ]}
      {...props}
    >
      {icon && <Icon color={colors.primary} source={icon} size={24} />}
      <View style={[genericStyles.flexColumn, { flex: 1, marginLeft: 16 }]}>
        <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
          {title}
        </Text>
        <Text variant="bodySmall" style={{ marginTop: 4 }}>
          {description}
        </Text>
      </View>
      <Icon source="chevron-right" size={24} />
    </TouchableOpacity>
  );
}
