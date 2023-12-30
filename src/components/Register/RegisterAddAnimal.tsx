import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { genericStyles } from '@/constants';
import i18n from '@/locales/localization';
import { UserRoleEnum } from '@/types';
import { Image, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useAuthContext } from '@/contexts';
import { router } from 'expo-router';
import { ROUTES } from '@/router/routes';
import Toast from 'react-native-toast-message';

export function RegisterAddAnimal(): JSX.Element {
  const logo = require('@/assets/images/app/logo-color.png');
  const { currentUser } = useAuthContext();

  async function onSubmit() {
    Toast.show({
      type: 'success',
      text1: `${i18n.t('success.register.title')} ${currentUser?.firstName} !`,
      text2: i18n.t('success.register.subtitle'),
    });
    if (currentUser?.role === UserRoleEnum.CHILD)
      router.push(ROUTES.dashboard.child);
    else router.push(ROUTES.dashboard.parent);
  }

  return (
    <>
      <View
        style={[
          genericStyles.flexCenter,
          { width: '100%', gap: 5, flexGrow: 1 },
        ]}
      >
        <Image source={logo} resizeMode="contain" style={{ width: 150 }} />
        <View>
          <Text variant="bodyMedium" style={{ textAlign: 'center' }}>
            {i18n.t('registerPage.animal.title')}
          </Text>
          <Text variant="bodySmall" style={{ textAlign: 'center' }}>
            {i18n.t('registerPage.animal.subtitle')}
          </Text>
        </View>
        <View
          style={[
            genericStyles.flexColumn,
            { width: '100%', gap: 5, marginTop: 10 },
          ]}
        >
          <Button
            onPress={() => router.push(ROUTES.animal.create)}
            icon={'plus'}
            mode="outlined"
          >
            {i18n.t('registerPage.animal.submit')}
          </Button>
        </View>
      </View>

      <PrimaryButton
        onPress={onSubmit}
        title={i18n.t('registerPage.createHouse')}
        big
      />
    </>
  );
}
