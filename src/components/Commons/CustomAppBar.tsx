import i18n from '@/locales/localization';
import { transformPathToKey } from '@/utils';
import { usePathname } from 'expo-router';
import { Appbar } from 'react-native-paper';

interface CustomNavigationBarProps {
  navigation: any;
  route: any;
  options: any;
  back?: any;
}

const CustomNavigationBar = ({
  navigation,
  route,
  options,
  back,
}: CustomNavigationBarProps) => {
  const title = i18n.t('Router.' + transformPathToKey(usePathname()));

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default CustomNavigationBar;
