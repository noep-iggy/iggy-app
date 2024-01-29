import { ApiService } from '@/api';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { DeleteDialog } from '@/components/Dialog/DeleteDialog';
import { genericStyles } from '@/constants';
import { useAuthContext } from '@/contexts';
import i18n from '@/locales/localization';
import { ROUTES } from '@/router/routes';
import { formatDateTime } from '@/utils';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme, Icon, Text, Divider } from 'react-native-paper';

const ProfileSettings = () => {
  const { currentUser, removeToken } = useAuthContext();
  const { showActionSheetWithOptions } = useActionSheet();
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const params = useLocalSearchParams();
  const theme = useTheme();
  const router = useRouter();

  async function removeUser() {
    if (!params) return;
    await ApiService.users.deleteMe();
    removeToken();
    router.push(ROUTES.auth.login);
  }

  const onPress = () => {
    const options = [
      i18n.t('generics.update'),
      i18n.t('generics.logout'),
      i18n.t('generics.delete'),
      i18n.t('generics.cancel'),
    ];
    const destructiveButtonIndex = 2;
    const cancelButtonIndex = 3;

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
            router.setParams({ id: currentUser?.id ?? '' });
            break;
          case 1:
            removeToken();
            router.push(ROUTES.auth.login);
            break;
          case destructiveButtonIndex:
            setIsConfirmVisible(true);
            break;
          case cancelButtonIndex:
        }
      }
    );
  };
  const PROFILE = [
    {
      label: i18n.t('fields.firstName.label'),
      value: currentUser?.firstName,
    },
    {
      label: i18n.t('fields.lastName.label'),
      value: currentUser?.lastName,
    },
    {
      label: i18n.t('fields.email.label'),
      value: currentUser?.email,
    },
    {
      label: i18n.t('fields.role.label'),
      value: i18n.t(`enums.role.${currentUser?.role}`),
    },
    {
      label: i18n.t('fields.generics.createdAt'),
      value: formatDateTime(currentUser?.createdAt ?? new Date()),
    },
    {
      label: i18n.t('fields.generics.updatedAt'),
      value: formatDateTime(currentUser?.updatedAt ?? new Date()),
    },
    {
      label: i18n.t('fields.generics.admin'),
      value: currentUser?.isAdmin
        ? i18n.t('generics.yes')
        : i18n.t('generics.no'),
    },
  ];

  return (
    <>
      <UniversalSafeArea
        style={{
          padding: 16,
        }}
        asView
      >
        <Stack.Screen
          options={{
            headerTitle: currentUser?.firstName,
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

export default ProfileSettings;
