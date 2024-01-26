import i18n from '@/locales/localization';
import { Button, Dialog, Portal, Text, useTheme } from 'react-native-paper';

interface DeleteDialogProps {
  icon?: string;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
  visible: boolean;
}

export function DeleteDialog(props: DeleteDialogProps): JSX.Element {
  const {
    icon = 'alert',
    title,
    content,
    onConfirm,
    onCancel,
    visible,
  } = props;
  const theme = useTheme();

  return (
    <Portal>
      <Dialog
        style={{
          backgroundColor: theme.colors.onError,
          borderColor: theme.colors.errorContainer,
          borderWidth: 2,
        }}
        visible={visible}
        onDismiss={() => onCancel()}
      >
        <Dialog.Icon icon={icon} color={theme.colors.error} />
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{content}</Text>
        </Dialog.Content>
        <Dialog.Actions style={{ gap: 4 }}>
          <Button
            style={{ paddingHorizontal: 8, paddingVertical: 2 }}
            mode="outlined"
            onPress={() => onCancel()}
          >
            {i18n.t('generics.cancel')}
          </Button>
          <Button
            style={{ paddingHorizontal: 8, paddingVertical: 3 }}
            icon="trash-can-outline"
            mode="contained"
            textColor={theme.colors.surface}
            buttonColor={theme.colors.error}
            onPress={() => onConfirm()}
          >
            {i18n.t('generics.delete')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
