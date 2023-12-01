import { ApiService } from '@/api';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import SecondaryButton from '@/components/Buttons/SecondaryButton';
import TertiaryButton from '@/components/Buttons/TertiaryButton';
import UniversalSafeArea from '@/components/UniversalSafeArea';
import { genericStyles } from '@/constants';
import { useAuthContext } from '@/contexts';
import { AuthLoginApi } from '@/types';
import i18n from 'locales/localization';
import { useEffect, useState } from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { ActivityIndicator, Title } from 'react-native-paper';

export default function Home() {
  const splashImage = require('@/assets/images/app/splash.png');
  const logo = require('@/assets/images/app/logo.png');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { currentUser, setToken } = useAuthContext();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  async function onSubmit(data: AuthLoginApi) {
    try {
      setIsLoading(true);
      const token = await ApiService.auth.login(data);
      setToken(token);
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log('[D] index', e);
      setIsLoading(false);
    }
  }

  return (
    <ImageBackground source={splashImage} style={{ flex: 1 }}>
      <UniversalSafeArea
        style={[genericStyles.flexEvenly, { paddingHorizontal: 16 }]}
      >
        <View style={{ marginTop: '70%', gap: 16 }}>
          <Image source={logo} resizeMode="contain" />
          <ActivityIndicator animating={isLoading} color="white" />
        </View>
        {currentUser && (
          <Title style={{ opacity: isLoading ? 0 : 1, color: 'white' }}>
            {`Bonjour ${currentUser?.firstName}`}
          </Title>
        )}
        <View
          style={[
            {
              gap: 8,
              marginTop: 'auto',
              opacity: isLoading ? 0 : 1,
              width: '100%',
            },
          ]}
        >
          <TertiaryButton
            title={i18n.t('LoginPage.Login')}
            textColor="white"
            icon="arrow-right"
            contentStyle={{
              flexDirection: 'row-reverse',
            }}
            onPress={() =>
              onSubmit({
                email: 'dorian@gmail.com',
                password: 'Azerty12!',
              })
            }
          />
          <PrimaryButton
            title={i18n.t('LoginPage.Register')}
            buttonColor="white"
            textColor="black"
            big
            onPress={() => {}}
          />
          <SecondaryButton
            title={i18n.t('LoginPage.Join')}
            theme={{ colors: { outline: 'white' } }}
            textColor="white"
            big
            onPress={() => {}}
          />
        </View>
      </UniversalSafeArea>
    </ImageBackground>
  );
}
