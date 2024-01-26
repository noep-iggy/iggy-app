import { ApiService } from '@/api';
import { SettingCard } from '@/components/Card/SettingCard';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { RefreshScroll } from '@/components/Scroll';
import { genericStyles } from '@/constants';
import { useAuthContext } from '@/contexts';
import i18n from '@/locales/localization';
import { ROUTES } from '@/router/routes';
import { UserDto } from '@/types';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

const FamilySettings = () => {
  const params = useLocalSearchParams();
  const theme = useTheme();
  const { currentUser } = useAuthContext();
  const [users, setUsers] = useState<UserDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getUsers() {
    setIsLoading(true);
    const users = await ApiService.house.getUsers();
    setUsers(users);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      getUsers();
    }, [])
  );

  return (
    <UniversalSafeArea
      style={{
        padding: 16,
      }}
      asView
    >
      <RefreshScroll
        emptyText={i18n.t('users.empty')}
        isEmpty={users.length === 1}
        isLoading={isLoading}
        onRefresh={() => getUsers()}
      >
        <View style={[genericStyles.colCenter, { gap: 10 }]}>
          {users
            .filter((user) => currentUser?.id !== user.id)
            .map((user) => (
              <SettingCard
                onPress={() => {
                  router.push(ROUTES.user.detail);
                  router.setParams({ id: user?.id ?? '0' });
                }}
                key={user.id}
                title={`${user.firstName} ${
                  user.lastName ? user.lastName : ''
                }`}
                description={i18n.t(`enums.role.${user.role}`)}
              />
            ))}
        </View>
      </RefreshScroll>
    </UniversalSafeArea>
  );
};

export default FamilySettings;
