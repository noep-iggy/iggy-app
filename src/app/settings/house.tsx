import { ApiService } from '@/api';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { CreateJoinCodeDialog } from '@/components/Dialog/CreateJoinCodeDialog';
import { DeleteDialog } from '@/components/Dialog/DeleteDialog';
import { genericStyles } from '@/constants';
import { useAuthContext } from '@/contexts';
import i18n from '@/locales/localization';
import { ROUTES } from '@/router/routes';
import { HouseDto, JoinCodeDto } from '@/types';
import { useActionSheet } from '@expo/react-native-action-sheet';
import {
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useTheme, Text, Icon, Divider } from 'react-native-paper';

const HouseSettings = () => {
  const params = useLocalSearchParams();
  const theme = useTheme();
  const router = useRouter();
  const { showActionSheetWithOptions } = useActionSheet();
  const { currentUser, removeToken } = useAuthContext();
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isJoinCodeVisible, setIsJoinCodeVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [house, setHouse] = useState<HouseDto>();
  const [code, setCode] = useState<JoinCodeDto>();

  async function createJoinCodeParent() {
    const joinCode = await ApiService.joinCode.create.parent();
    setCode(joinCode);
    setIsJoinCodeVisible(true);
  }

  async function createJoinCodeChild() {
    const joinCode = await ApiService.joinCode.create.child();
    setCode(joinCode);
    setIsJoinCodeVisible(true);
  }

  async function removeHouse() {
    if (!params) return;
    await ApiService.house.remove();
    removeToken();
    router.push(ROUTES.auth.login);
  }

  async function getHouse() {
    setIsLoading(true);
    const house = await ApiService.house.get();
    setHouse(house);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      getHouse();
    }, [])
  );

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
            router.push(ROUTES.house.update);
            break;

          case destructiveButtonIndex:
            setIsConfirmVisible(true);
            break;
          case cancelButtonIndex:
        }
      }
    );
  };

  const HOUSE = [
    {
      label: i18n.t('fields.name.label'),
      value: house?.name,
    },
    {
      label: i18n.t('fields.billingPlan.label'),
      value: i18n.t(`enums.billingPlan.${house?.billingPlan}`),
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
            headerTitle: currentUser?.house?.name ?? '',
            headerRight: () => (
              <TouchableOpacity onPress={onPress}>
                <Icon size={25} source="dots-vertical" />
              </TouchableOpacity>
            ),
          }}
        />
        <ScrollView>
          <View style={[genericStyles.flexColumn, { gap: 15, marginTop: 10 }]}>
            {HOUSE.map((item) => (
              <View key={item.label} style={[genericStyles.flexColumn]}>
                <Text variant="titleMedium">{item.label}</Text>
                <Text variant="bodyMedium">{item.value}</Text>
                <Divider style={{ marginTop: 10 }} />
              </View>
            ))}
          </View>
          <View style={[genericStyles.flexColumn, { marginTop: 40 }]}>
            <Text variant="titleLarge">{i18n.t('joinCode.create.title')}</Text>
            <Text variant="titleMedium" style={{ marginTop: 10 }}>
              {i18n.t('joinCode.create.subtitle')}
            </Text>
            <View style={[genericStyles.flexRow, { marginTop: 20, gap: 5 }]}>
              <PrimaryButton
                title={i18n.t('joinCode.create.parent')}
                onPress={createJoinCodeParent}
              />
              <PrimaryButton
                title={i18n.t('joinCode.create.child')}
                onPress={createJoinCodeChild}
              />
            </View>
          </View>
        </ScrollView>
      </UniversalSafeArea>
      <DeleteDialog
        visible={isConfirmVisible}
        onConfirm={() => {
          setIsConfirmVisible(false);
          removeHouse();
        }}
        onCancel={() => setIsConfirmVisible(false)}
        title={i18n.t('housePage.confirmDelete.title')}
        content={i18n.t('housePage.confirmDelete.subtitle')}
      />
      <CreateJoinCodeDialog
        visible={isJoinCodeVisible}
        onCancel={() => {
          setIsJoinCodeVisible(false);
          setCode(undefined);
        }}
        code={code?.code ?? ''}
      />
    </>
  );
};

export default HouseSettings;
