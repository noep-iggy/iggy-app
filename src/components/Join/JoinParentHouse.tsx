import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { genericStyles } from '@/constants';
import i18n from '@/locales/localization';
import { JoinCodeDto, JoinParentApi } from '@/types';
import { userValidation } from '@/validations';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { ApiService } from '@/api';
import FormField from '@/components/Forms/FormField';
import { formatValidationErrorMessage } from '@/utils/error';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import { ROUTES } from '@/router/routes';
import { useAuthContext } from '@/contexts';
import { formatTime } from '@/utils';

interface JoinParentHouseProps {
  joinCode: JoinCodeDto;
}

export function JoinParentHouse(props: JoinParentHouseProps): JSX.Element {
  const { joinCode } = props;
  const formApi = useForm<JoinParentApi>({
    resolver: yupResolver(userValidation.joinParent),
    mode: 'onTouched',
  });
  const { setToken } = useAuthContext();

  const { handleSubmit, formState, setError } = formApi;
  const { isSubmitting, isValid } = formState;

  async function onSubmit(data: JoinParentApi) {
    try {
      const token = await ApiService.auth.join(joinCode.code, data);
      setToken(token);
      Toast.show({
        type: 'success',
        text1: i18n.t('success.api.house.join'),
      });
      router.push(ROUTES.dashboard.parent);
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
      <View style={[{ width: '100%', gap: 10 }]}>
        <Text variant="headlineLarge" style={{ textAlign: 'center' }}>
          {joinCode.house}
        </Text>
        <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
          {`${i18n.t('joinPage.create.expiration')} ${formatTime(
            joinCode.expirationDate
          )}`}
        </Text>
        <Text variant="bodyMedium" style={{ textAlign: 'center' }}>
          {i18n.t('joinPage.create.parent')}
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
        title={i18n.t('joinPage.create.submit')}
        big
        style={{ marginTop: 20 }}
      />
    </>
  );
}
