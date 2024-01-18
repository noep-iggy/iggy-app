import { genericStyles } from '@/constants';
import i18n from '@/locales/localization';
import { TaskStatusEnum } from '@/types';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';

interface TaskStatusProps {
  taskStatus: TaskStatusEnum;
  style?: StyleProp<ViewStyle>;
}

export function TaskStatus(props: TaskStatusProps): JSX.Element {
  const { taskStatus, style } = props;
  const theme = useTheme();

  function renderColor(status: TaskStatusEnum): string {
    switch (status) {
      case TaskStatusEnum.TODO:
        return '#52CAE2';
      case TaskStatusEnum.TO_VALIDATE:
        return 'orange';
      case TaskStatusEnum.DONE:
        return theme.colors.primary;

      default:
        return theme.colors.error;
    }
  }

  function renderIcon(status: TaskStatusEnum): string {
    switch (status) {
      case TaskStatusEnum.TODO:
        return 'account-clock-outline';
      case TaskStatusEnum.DONE:
        return 'check-circle-outline';
      case TaskStatusEnum.TO_VALIDATE:
        return 'alert-circle-outline';
      default:
        return 'alarm';
    }
  }

  return (
    <View
      style={[
        genericStyles.flexRow,
        {
          backgroundColor: renderColor(taskStatus),
          borderRadius: 50,
          paddingHorizontal: 8,
          paddingVertical: 4,
          alignItems: 'center',
          alignSelf: 'flex-start',
        },
        style,
      ]}
    >
      <Icon
        source={renderIcon(taskStatus)}
        color={theme.colors.surfaceVariant}
        size={15}
      />
      <Text
        variant="bodySmall"
        style={{ marginLeft: 4, color: theme.colors.surfaceVariant }}
      >
        {i18n.t(`enums.status.${taskStatus}`)}
      </Text>
    </View>
  );
}
