import { ScrollView, View } from 'react-native';
import { genericStyles } from '@/constants';
import { SettingCard } from '@/components/Card/SettingCard';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { ROUTES } from '@/router/routes';
import { useRouter } from 'expo-router';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import i18n from '@/locales/localization';
import { useAuthContext } from '@/contexts';
import { useAppTheme } from '@/app/_layout';

const Settings = () => {
  const router = useRouter();
  const { removeToken } = useAuthContext();
  const theme = useAppTheme();

  const SETTINGS = [
    {
      icon: 'account-circle',
      title: i18n.t('Router.settings_profile'),
      onPress: () => router.push(ROUTES.settings.profile),
    },
    {
      icon: 'account-multiple',
      title: i18n.t('Router.settings_family'),
      onPress: () => router.push(ROUTES.settings.family),
    },
    {
      icon: 'home',
      title: i18n.t('Router.settings_house'),
      onPress: () => router.push(ROUTES.settings.house),
    },
    // {
    //   icon: 'bell',
    //   title: 'Notifications',
    // },
    {
      icon: 'lock',
      title: i18n.t('Router.settings_cgu'),
      onPress: () => router.push(ROUTES.settings.cgu),
    },
    // {
    //   icon: 'help-circle',
    //   title: 'Help',
    // },
  ];

  return (
    <UniversalSafeArea asView>
      <ScrollView
        style={{ paddingHorizontal: 12, marginTop: 16, height: '100%' }}
      >
        <View style={[genericStyles.colCenter, { flexGrow: 1 }]}>
          {SETTINGS.map((setting) => (
            <SettingCard key={setting.title} {...setting} />
          ))}
        </View>
        <PrimaryButton
          title={i18n.t('generics.logout')}
          buttonColor={theme.colors.errorContainer}
          textColor={theme.colors.onErrorContainer}
          style={{ marginTop: 32 }}
          onPress={() => {
            removeToken();
          }}
        />
      </ScrollView>
    </UniversalSafeArea>
  );
};

export default Settings;
