import { useAppTheme } from '@/app/_layout';
import { TaskStatusEnum } from '@/types';

export function renderTaskColor(status: TaskStatusEnum): string {
  const theme = useAppTheme();
  switch (status) {
    case TaskStatusEnum.TODO:
      return theme.colors.tertiaryContainer;
    case TaskStatusEnum.TO_VALIDATE:
      return theme.colors.warningContainer;
    case TaskStatusEnum.DONE:
      return theme.colors.secondaryContainer;

    default:
      return theme.colors.errorContainer;
  }
}

export function renderTextTaskColor(status: TaskStatusEnum): string {
  const theme = useAppTheme();
  switch (status) {
    case TaskStatusEnum.TODO:
      return theme.colors.onTertiaryContainer;
    case TaskStatusEnum.TO_VALIDATE:
      return theme.colors.onWarningContainer;
    case TaskStatusEnum.DONE:
      return theme.colors.onSecondaryContainer;
    default:
      return 'black';
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
