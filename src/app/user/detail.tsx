import { ApiService } from '@/api';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { DeleteDialog } from '@/components/Dialog/DeleteDialog';
import { genericStyles } from '@/constants';
import i18n from '@/locales/localization';
import { ROUTES } from '@/router/routes';
import { UserDto } from '@/types';
import { formatDateTime } from '@/utils';
import { useActionSheet } from '@expo/react-native-action-sheet';
import {
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from 'expo-router';
import { useCallback, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme, Icon, Text, Divider } from 'react-native-paper';

const UserDetail = () => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [user, setUser] = useState<UserDto>();
  const params = useLocalSearchParams();
  const theme = useTheme();
  const router = useRouter();

  async function removeUser() {
    if (!params) return;
    await ApiService.users.deleteById(params.id as string);
    router.back();
  }

  const onPress = () => {
    const options = [
      i18n.t('generics.update'),
      i18n.t('generics.delete'),
      i18n.t('generics.cancel'),
    ];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        userInterfaceStyle: theme.dark ? 'dark' : 'light',
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        tintIcons: true,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            router.push(ROUTES.user.update);
            router.setParams({ id: user?.id ?? '' });
            break;
          case destructiveButtonIndex:
            setIsConfirmVisible(true);
            break;
          case cancelButtonIndex:
        }
      }
    );
  };

  async function fetchUser(id: string) {
    const user = await ApiService.users.getById(id);
    setUser(user);
  }

  useFocusEffect(
    useCallback(() => {
      if (!params.id) return;
      fetchUser(params.id as string);
    }, [params])
  );

  const PROFILE = [
    {
      label: i18n.t('fields.firstName.label'),
      value: user?.firstName,
    },
    {
      label: i18n.t('fields.lastName.label'),
      value: user?.lastName ?? i18n.t('generics.empty'),
    },
    {
      label: i18n.t('fields.email.label'),
      value: user?.email ?? i18n.t('generics.empty'),
    },
    {
      label: i18n.t('fields.role.label'),
      value: i18n.t(`enums.role.${user?.role}`),
    },
    {
      label: i18n.t('fields.generics.createdAt'),
      value: formatDateTime(user?.createdAt ?? new Date()),
    },
    {
      label: i18n.t('fields.generics.updatedAt'),
      value: formatDateTime(user?.updatedAt ?? new Date()),
    },
    {
      label: i18n.t('fields.generics.admin'),
      value: user?.isAdmin ? i18n.t('generics.yes') : i18n.t('generics.no'),
    },
  ];

  return (
    <>
      <UniversalSafeArea
        style={{
          paddingVertical: 16,
          paddingHorizontal: 32,
        }}
        asView
      >
        <Stack.Screen
          options={{
            headerTitle: user?.firstName,
            headerRight: () => (
              <TouchableOpacity onPress={onPress}>
                <Icon size={25} source="dots-vertical" />
              </TouchableOpacity>
            ),
          }}
        />
        <ScrollView>
          <View style={[genericStyles.flexColumn, { gap: 15, marginTop: 10 }]}>
            {PROFILE.map((item) => (
              <View key={item.label} style={[genericStyles.flexColumn]}>
                <Text variant="titleMedium">{item.label}</Text>
                <Text variant="bodyMedium">{item.value}</Text>
                <Divider style={{ marginTop: 10 }} />
              </View>
            ))}
          </View>
        </ScrollView>
      </UniversalSafeArea>
      <DeleteDialog
        visible={isConfirmVisible}
        onConfirm={() => {
          setIsConfirmVisible(false);
          removeUser();
        }}
        onCancel={() => setIsConfirmVisible(false)}
        title={i18n.t('users.me.confirmDelete.title')}
        content={i18n.t('users.me.confirmDelete.subtitle')}
      />
    </>
  );
};

export default UserDetail;
