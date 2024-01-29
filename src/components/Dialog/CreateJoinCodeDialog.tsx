import i18n from '@/locales/localization';
import { Button, Dialog, Portal, Text, useTheme } from 'react-native-paper';
import PrimaryButton from '../Buttons/PrimaryButton';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';

interface CreateJoinCodeDialogProps {
  onCancel: () => void;
  visible: boolean;
  code: string;
}

export function CreateJoinCodeDialog(
  props: CreateJoinCodeDialogProps
): JSX.Element {
  const { onCancel, visible, code } = props;
  const theme = useTheme();

  async function copyToClipboard() {
    await Clipboard.setStringAsync(code);
    Toast.show({
      type: 'success',
      text1: i18n.t('success.joinCode.copy'),
    });
    onCancel();
  }

  return (
    <Portal>
      <Dialog
        style={{
          borderColor: theme.colors.primary,
          borderWidth: 2,
        }}
        visible={visible}
        onDismiss={() => onCancel()}
      >
        <Dialog.Title>{i18n.t('joinCode.create.copyText')}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{i18n.t('joinCode.create.time')}</Text>
          <Text
            style={{
              marginVertical: 20,
              textAlign: 'center',
              letterSpacing: 3,
            }}
            variant="displayLarge"
          >
            {code}
          </Text>
        </Dialog.Content>
        <Dialog.Actions style={{ gap: 4 }}>
          <Button
            style={{ paddingHorizontal: 8, paddingVertical: 2 }}
            mode="outlined"
            onPress={() => onCancel()}
          >
            {i18n.t('generics.cancel')}
          </Button>
          <PrimaryButton
            style={{ paddingHorizontal: 8, paddingVertical: 3 }}
            icon="content-copy"
            mode="contained"
            onPress={() => copyToClipboard()}
            title={i18n.t('generics.copy')}
          />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
