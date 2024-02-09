import { useAppTheme } from '@/app/_layout';
import { genericStyles } from '@/constants';
import i18n from '@/locales/localization';
import { TaskStatusEnum } from '@/types';
import { renderTaskColor, renderTaskIcon } from '@/utils/task';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Icon, Text } from 'react-native-paper';

interface TaskStatusProps {
  taskStatus: TaskStatusEnum;
  style?: StyleProp<ViewStyle>;
}

export function TaskStatus(props: TaskStatusProps): JSX.Element {
  const { taskStatus, style } = props;
  const theme = useAppTheme();

  return (
    <View
      style={[
        genericStyles.flexRow,
        {
          backgroundColor: renderTaskColor(taskStatus, theme),
          borderRadius: 50,
          paddingHorizontal: 8,
          paddingVertical: 4,
          alignItems: 'center',
          alignSelf: 'flex-start',
        },
        style,
      ]}
    >
      <Icon source={renderTaskIcon(taskStatus)} color={'white'} size={15} />
      <Text variant="bodySmall" style={{ marginLeft: 4, color: 'white' }}>
        {i18n.t(`enums.status.${taskStatus}`)}
      </Text>
    </View>
  );
}
