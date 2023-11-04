import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import i18n from '../locales/localization';

export default function SignIn() {
  return (
    <SafeAreaView>
      <Text>{i18n.t('Welcome')}</Text>
    </SafeAreaView>
  );
}
