import { genericStyles } from '@/constants';
import { TouchableOpacityProps, View } from 'react-native';
import { Icon, Text, TouchableRipple, useTheme } from 'react-native-paper';

interface SettingCardProps extends TouchableOpacityProps {
  icon?: string;
  title: string;
}

export function SettingCard(props: SettingCardProps): JSX.Element {
  const { title, icon, style } = props;
  const { colors } = useTheme();
  return (
    <TouchableRipple
      style={[
        genericStyles.flexRow,
        {
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: colors.background,
          padding: 16,
          borderRadius: 8,
          borderBottomWidth: 1,
          borderColor: colors.outlineVariant,
        },
        style,
      ]}
      {...props}
    >
      <>
        {icon && <Icon color={colors.primary} source={icon} size={24} />}
        <View style={[genericStyles.flexColumn, { flex: 1, marginLeft: 16 }]}>
          <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
            {title}
          </Text>
        </View>
        <Icon source="chevron-right" size={24} />
      </>
    </TouchableRipple>
  );
}
