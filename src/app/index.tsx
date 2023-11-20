import UniversalSafeArea from '@/components/UniversalSafeArea';
import { genericStyles } from '@/constants';
import { useEffect, useState } from 'react';
import { Image, ImageBackground } from 'react-native';
import { ActivityIndicator, Button, Surface } from 'react-native-paper';

export default function Home() {
  const splashImage = require('@/assets/images/app/splash.png');
  const logo = require('@/assets/images/app/logo.png');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <ImageBackground source={splashImage} style={{ flex: 1 }}>
      <UniversalSafeArea style={[genericStyles.flexCenter]}>
        <Image
          source={logo}
          style={{ width: isLoading ? 250 : 175 }}
          resizeMode="contain"
        />
        <ActivityIndicator animating={isLoading} color="white" />
        {!isLoading && (
          <Surface elevation={0} style={{ gap: 8 }}>
            <Button
              mode="contained"
              buttonColor="white"
              onPress={() => console.log('a')}
            >
              Créer une maison
            </Button>
            <Button
              mode="outlined"
              textColor="white"
              theme={{ colors: { outline: 'white' } }}
              onPress={() => console.log('a')}
            >
              Rejoindre une maison
            </Button>
            <Button
              mode="text"
              textColor="white"
              onPress={() => console.log('a')}
            >
              Se connecter à un compte existant
            </Button>
          </Surface>
        )}
      </UniversalSafeArea>
    </ImageBackground>
  );
}
