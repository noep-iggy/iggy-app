import { TaskStatusEnum } from '@/types';
import { MD3Theme, useTheme } from 'react-native-paper';

export function renderTaskColor(
  status: TaskStatusEnum,
  theme: MD3Theme
): string {
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

export function renderTaskIcon(status: TaskStatusEnum): string {
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
