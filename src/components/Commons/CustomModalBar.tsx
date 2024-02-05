import i18n from '@/locales/localization';
import { transformPathToKey } from '@/utils';
import { usePathname } from 'expo-router';
import { ImageBackground } from 'react-native';
import { Appbar } from 'react-native-paper';

interface CustomModalBarProps {
  navigation: any;
  route: any;
  options: any;
  back?: any;
}

const CustomModalBar = ({
  navigation,
  route,
  options,
  back,
}: CustomModalBarProps) => {
  const title = i18n.t('Router.' + transformPathToKey(usePathname()));
  const background = require('@/assets/images/app/splash.png');

  return (
    <ImageBackground source={background}>
      <Appbar.Header
        style={{
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        }}
        statusBarHeight={0}
      >
        <Appbar.Content color="white" title={options.headerTitle ?? title} />
        <Appbar.Action color="white" icon="close" onPress={navigation.goBack} />
      </Appbar.Header>
    </ImageBackground>
  );
};

export default CustomModalBar;
