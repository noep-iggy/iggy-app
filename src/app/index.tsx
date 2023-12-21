import PrimaryButton from '@/components/Buttons/PrimaryButton';
import SecondaryButton from '@/components/Buttons/SecondaryButton';
import TertiaryButton from '@/components/Buttons/TertiaryButton';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { genericStyles } from '@/constants';
import i18n from '@/locales/localization';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const Home = () => {
  const splashImage = require('@/assets/images/app/splash.png');
  const logo = require('@/assets/images/app/logo.png');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  });

  return (
    <ImageBackground
      source={splashImage}
      style={{ height: '100%', width: '100%' }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <UniversalSafeArea
        style={[genericStyles.flexCenter, { paddingHorizontal: 16 }]}
      >
        <View style={{ gap: 16 }}>
          <Image source={logo} resizeMode="contain" />
          <ActivityIndicator animating={isLoading} color="white" />
        </View>
        <View
          style={[
            {
              gap: 8,
              width: '100%',
              maxWidth: 600,
              opacity: isLoading ? 0 : 1,
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
              router.push({
                pathname: '/home/login',
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
};

export default Home;
