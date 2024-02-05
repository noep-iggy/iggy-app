import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { genericStyles } from '@/constants';
import i18n from '@/locales/localization';
import { AuthRegisterUi } from '@/types';
import { userValidation } from '@/validations';
import { Image, View } from 'react-native';
import { Text } from 'react-native-paper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { ApiService } from '@/api';
import { useAuthContext } from '@/contexts';
import FormField from '@/components/Forms/FormField';
import { formatValidationErrorMessage } from '@/utils/error';
import Toast from 'react-native-toast-message';

export interface RegisterUserProps {
  setCurrentStep: (step: number) => void;
}

export function RegisterUser(props: RegisterUserProps): JSX.Element {
  const { setCurrentStep } = props;
  const logo = require('@/assets/images/app/logo-color.png');
  const { setToken } = useAuthContext();

  const formApi = useForm<AuthRegisterUi>({
    resolver: yupResolver(userValidation.create),
    mode: 'onTouched',
  });

  const { handleSubmit, formState, setError } = formApi;
  const { isSubmitting, isValid } = formState;

  async function onSubmit(data: AuthRegisterUi) {
    try {
      const token = await ApiService.auth.register(data);
      setToken(token);
      const user = await ApiService.users.me();

      Toast.show({
        type: 'success',
        text1: `${i18n.t('welcome')} ${user?.firstName ?? ''} !`,
        text2: i18n.t('success.api.register'),
      });
      setCurrentStep(2);
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

  return (
    <>
      <View
        style={[
          {
            width: '100%',
            gap: 10,
            flexGrow: 1,
            alignItems: 'center',
          },
        ]}
      >
        <Image source={logo} resizeMode="contain" style={{ width: 150 }} />
        <Text variant="bodyMedium" style={{ textAlign: 'center' }}>
          {i18n.t('registerPage.subTitle')}
        </Text>
        <View style={[genericStyles.flexColumn, { width: '100%', gap: 5 }]}>
          <FormProvider {...formApi}>
            <FormField
              label={i18n.t('fields.lastName.label')}
              name="lastName"
              type="text"
            />
            <FormField
              label={i18n.t('fields.firstName.label')}
              name="firstName"
              type="text"
            />
            <FormField
              label={i18n.t('fields.email.label')}
              name="email"
              type="text"
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <FormField
              label={i18n.t('fields.password.label')}
              name="password"
              type="password"
            />
            <FormField
              label={i18n.t('fields.confirmPassword.label')}
              name="confirmPassword"
              type="password"
            />
          </FormProvider>
        </View>
      </View>

      <PrimaryButton
        disabled={!isValid || isSubmitting}
        loading={isSubmitting}
        onPress={handleSubmit(onSubmit)}
        title={i18n.t('registerPage.submit')}
        big
        style={{ marginTop: 20 }}
      />
    </>
  );
}
