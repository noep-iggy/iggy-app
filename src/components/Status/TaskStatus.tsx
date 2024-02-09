import i18n from '@/locales/localization';
import { TaskStatusEnum } from '@/types';
import {
  renderTaskColor,
  renderTaskIcon,
  renderTextTaskColor,
} from '@/utils/task';
import { StyleProp, ViewStyle } from 'react-native';
import { Chip, Icon } from 'react-native-paper';

interface TaskStatusProps {
  taskStatus: TaskStatusEnum;
  style?: StyleProp<ViewStyle>;
}

export function TaskStatus(props: TaskStatusProps): JSX.Element {
  const { style, taskStatus } = props;

  return (
    <Chip
      icon={() => {
        return (
          <Icon
            source={renderTaskIcon(taskStatus)}
            color={renderTextTaskColor(taskStatus)}
            size={16}
          />
        );
      }}
      textStyle={{ color: renderTextTaskColor(taskStatus) }}
      style={[{ backgroundColor: renderTaskColor(taskStatus) }, style]}
    >
      {i18n.t(`enums.status.${taskStatus}`)}
    </Chip>
  );
}
