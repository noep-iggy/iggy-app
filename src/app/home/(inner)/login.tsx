import PrimaryButton from '@/components/Buttons/PrimaryButton';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { genericStyles } from '@/constants';
import i18n from '@/locales/localization';
import { AuthLoginApi } from '@/types';
import { userValidation } from '@/validations';
import { useEffect } from 'react';
import { Image, View } from 'react-native';
import { Text } from 'react-native-paper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { ApiService } from '@/api';
import { useAuthContext } from '@/contexts';
import FormField from '@/components/Forms/FormField';
import { formatValidationErrorMessage } from '@/utils/error';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';

const Login = () => {
  const logo = require('@/assets/images/app/logo-color.png');
  const { setToken, currentUser } = useAuthContext();
  const router = useRouter();

  const formApi = useForm<AuthLoginApi>({
    resolver: yupResolver(userValidation.login),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
  });

  const { handleSubmit, formState, setError } = formApi;
  const { isSubmitting, isValid } = formState;

  async function onSubmit(data: AuthLoginApi) {
    try {
      const token = await ApiService.auth.login(data);
      setToken(token);
      const user = await ApiService.users.me();
      Toast.show({
        type: 'success',
        text1: `${i18n.t('welcome')} ${user?.firstName ?? ''}!`,
        text2: i18n.t('success.api.login'),
      });

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

  // TODO: Faire la redirection vers le dashboard quand les pages seront prêtes
  useEffect(() => {
    if (!currentUser) return;
    // currentUser?.role === UserRoleEnum.PARENT
    //   ? router.push(ROUTES.dashboard.parent)
    //   : router.push(ROUTES.dashboard.child);
    console.log('[D] login', currentUser);
  }, [currentUser]);

  return (
    <UniversalSafeArea
      style={[
        {
          justifyContent: 'space-around',
          padding: 16,
        },
      ]}
    >
      <View style={[genericStyles.flexCenter, { width: '100%', gap: 10 }]}>
        <Image source={logo} resizeMode="contain" style={{ width: 150 }} />
        <Text variant="bodyMedium">{i18n.t('LoginPage.Subtitle')}</Text>
        <View style={[genericStyles.flexColumn, { width: '100%', gap: 5 }]}>
          <FormProvider {...formApi}>
            <FormField
              label={i18n.t('fields.email.label')}
              name="email"
              type="text"
              keyboardType="email-address"
            />
            <FormField
              label={i18n.t('fields.password.label')}
              name="password"
              type="password"
            />
          </FormProvider>
        </View>
      </View>

      <PrimaryButton
        disabled={!isValid || isSubmitting}
        loading={isSubmitting}
        onPress={handleSubmit(onSubmit)}
        title={i18n.t('LoginPage.Submit')}
        textColor="white"
        big
      />
    </UniversalSafeArea>
  );
};

export default Login;
