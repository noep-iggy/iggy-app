import { ApiService } from '@/api';
import { ButtonsAction } from '@/components/Actions/ButtonsAction';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { CreateJoinCodeDialog } from '@/components/Dialog/CreateJoinCodeDialog';
import { DeleteDialog } from '@/components/Dialog/DeleteDialog';
import { genericStyles } from '@/constants';
import { useAuthContext } from '@/contexts';
import i18n from '@/locales/localization';
import { ROUTES } from '@/router/routes';
import { HouseDto, JoinCodeDto } from '@/types';
import {
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Text, Divider, ActivityIndicator } from 'react-native-paper';

const HouseSettings = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
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
      <StatusBar style="auto" />
      <UniversalSafeArea
        style={{
          padding: 16,
        }}
        asView
      >
        <Stack.Screen
          options={{
            headerTitle: currentUser?.house?.name ?? '',
          }}
        />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <ScrollView>
            <View
              style={[genericStyles.flexColumn, { gap: 15, marginTop: 10 }]}
            >
              {HOUSE.map((item) => (
                <View key={item.label} style={[genericStyles.flexColumn]}>
                  <Text variant="titleMedium">{item.label}</Text>
                  <Text variant="bodyMedium">{item.value}</Text>
                  <Divider style={{ marginTop: 10 }} />
                </View>
              ))}
            </View>
            <View style={[genericStyles.flexColumn, { marginTop: 40 }]}>
              <Text variant="titleLarge">
                {i18n.t('joinCode.create.title')}
              </Text>
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
        )}
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
      <ButtonsAction
        icon="cog"
        items={[
          {
            icon: 'pencil',
            label: i18n.t('generics.update'),
            onPress: () => {
              router.push(ROUTES.house.update);
            },
          },
          {
            icon: 'trash-can',
            label: i18n.t('generics.delete'),
            onPress: () => {
              setIsConfirmVisible(true);
            },
          },
        ]}
      />
    </>
  );
};

export default HouseSettings;
