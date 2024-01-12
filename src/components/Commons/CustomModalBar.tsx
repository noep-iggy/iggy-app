import i18n from '@/locales/localization';
import { transformPathToKey } from '@/utils';
import { usePathname } from 'expo-router';
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

  return (
    <Appbar.Header statusBarHeight={0}>
      <Appbar.Content title={options.headerTitle ?? title} />
      <Appbar.Action icon="close" onPress={navigation.goBack} />
    </Appbar.Header>
  );
};

export default CustomModalBar;
