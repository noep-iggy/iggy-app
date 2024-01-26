import { ScrollView, View } from 'react-native';
import { genericStyles } from '@/constants';
import { SettingCard } from '@/components/Card/SettingCard';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { ROUTES } from '@/router/routes';
import { useRouter } from 'expo-router';

const Settings = () => {
  const router = useRouter();

  const SETTINGS = [
    {
      icon: 'account-circle',
      title: 'Profile',
      description: 'Gérer votre profil',
      onPress: () => router.push(ROUTES.settings.profile),
    },
    {
      icon: 'account-multiple',
      title: 'Famille',
      description: 'Gérer votre famille',
      onPress: () => router.push(ROUTES.settings.family),
    },
    {
      icon: 'home',
      title: 'Maison',
      description: 'Gérer votre maison',
      onPress: () => router.push(ROUTES.settings.house),
    },
    {
      icon: 'bell',
      title: 'Notifications',
      description: 'Gérer vos notifications',
    },
    {
      icon: 'lock',
      title: 'Privacy',
      description: 'Gérer votre vie privée',
    },
    {
      icon: 'help-circle',
      title: 'Help',
      description: "Besoin d'aide ?",
    },
    {
      icon: 'information',
      title: 'À Propos',
      description: 'Qui sommes-nous ?',
    },
  ];

  return (
    <UniversalSafeArea asView>
      <ScrollView style={{ padding: 16 }}>
        <View style={[genericStyles.colCenter, { gap: 10 }]}>
          {SETTINGS.map((setting) => (
            <SettingCard key={setting.title} {...setting} />
          ))}
        </View>
      </ScrollView>
    </UniversalSafeArea>
  );
};

export default Settings;
