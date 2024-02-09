import { ApiService } from '@/api';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import SecondaryButton from '@/components/Buttons/SecondaryButton';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import FormField from '@/components/Forms/FormField';
import { genericStyles } from '@/constants';
import { useAuthContext } from '@/contexts';
import i18n from '@/locales/localization';
import { UpdateUserApi, UserDto, UserRoleEnum } from '@/types';
import { formatValidationErrorMessage } from '@/utils/error';
import { userValidation } from '@/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Toast from 'react-native-toast-message';

const ProfileUpdate = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { currentUser, refreshUser } = useAuthContext();
  const [user, setUser] = useState<UserDto>();

  const formApi = useForm<UpdateUserApi>({
    resolver: yupResolver(userValidation.update),
    mode: 'onTouched',
  });

  const { handleSubmit, formState, setError } = formApi;
  const { isSubmitting, isValid } = formState;

  async function onSubmit(data: UpdateUserApi) {
    try {
      await ApiService.users.updateById(params.id as string, data);
      if (currentUser?.id === params.id) {
        await refreshUser();
      }

      Toast.show({
        type: 'success',
        text1: i18n.t('success.api.user.update'),
      });
      router.back();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      formatValidationErrorMessage(e?.data?.errors, setError);
      e?.data?.message &&
        Toast.show({
          type: 'error',
          text1: i18n.t('errors.api.title'),
          text2: i18n.t(`errors.${e?.data?.message}`),
        });
    }
  }

  async function fetchUser(id: string) {
    setIsLoading(true);
    const userFetched = await ApiService.users.getById(id);
    formApi.reset({
      firstName: userFetched.firstName,
      lastName: userFetched.lastName,
      email: userFetched.email,
    });
    setUser(userFetched);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      if (!params.id) return;
      fetchUser(params.id as string);
    }, [params])
  );

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <UniversalSafeArea
        style={[
          {
            padding: 16,
            justifyContent: 'space-between',
          },
        ]}
        asView
      >
        {isLoading ? (
          <ActivityIndicator animating={true} />
        ) : (
          <View
            style={[
              genericStyles.flexColumn,
              {
                gap: 15,
                marginTop: 20,
              },
            ]}
          >
            <FormProvider {...formApi}>
              {user?.role === UserRoleEnum.PARENT && (
                <FormField
                  label={i18n.t('fields.lastName.label')}
                  name="lastName"
                  type="text"
                />
              )}
              <FormField
                label={i18n.t('fields.firstName.label')}
                name="firstName"
                type="text"
              />
              {user?.role === UserRoleEnum.PARENT && (
                <FormField
                  label={i18n.t('fields.email.label')}
                  name="email"
                  type="text"
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              )}
            </FormProvider>
            <View style={[genericStyles.flexRow, { marginTop: 30, gap: 10 }]}>
              <SecondaryButton
                onPress={router.back}
                title={i18n.t('generics.back')}
                big
              />
              <PrimaryButton
                style={{ flex: 1 }}
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
                onPress={handleSubmit(onSubmit)}
                title={i18n.t('generics.update')}
                big
              />
            </View>
          </View>
        )}
      </UniversalSafeArea>
    </KeyboardAvoidingView>
  );
};

export default ProfileUpdate;
