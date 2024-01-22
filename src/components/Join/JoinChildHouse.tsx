import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { genericStyles } from '@/constants';
import i18n from '@/locales/localization';
import { JoinChildApi, JoinCodeDto } from '@/types';
import { userValidation } from '@/validations';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { ApiService } from '@/api';
import FormField from '@/components/Forms/FormField';
import { formatValidationErrorMessage } from '@/utils/error';
import Toast from 'react-native-toast-message';
import { ROUTES } from '@/router/routes';
import { router } from 'expo-router';
import { useAuthContext } from '@/contexts';
import { formatTime } from '@/utils';

interface JoinChildHouseProps {
  joinCode: JoinCodeDto;
}

export function JoinChildHouse(props: JoinChildHouseProps): JSX.Element {
  const { joinCode } = props;
  const { setToken } = useAuthContext();

  const formApi = useForm<JoinChildApi>({
    resolver: yupResolver(userValidation.joinChild),

    mode: 'onTouched',
  });

  const { handleSubmit, formState, setError } = formApi;
  const { isSubmitting, isValid } = formState;

  async function onSubmit(data: JoinChildApi) {
    try {
      const token = await ApiService.auth.join(joinCode.code, data);
      setToken(token);

      Toast.show({
        type: 'success',
        text1: i18n.t('success.api.house.join'),
      });
      router.replace(ROUTES.dashboard.child);
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
          genericStyles.flexCenter,
          { width: '100%', gap: 10, flexGrow: 1 },
        ]}
      >
        <Text variant="titleLarge" style={{ textAlign: 'center' }}>
          {`${i18n.t('joinPage.create.title')} ${joinCode.house}`}
        </Text>
        <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
          {`${i18n.t('joinPage.create.expiration')} ${formatTime(
            joinCode.expirationDate
          )}`}
        </Text>
        <Text variant="bodyMedium" style={{ textAlign: 'center' }}>
          {i18n.t('joinPage.create.child')}
        </Text>
        <View style={[genericStyles.flexColumn, { width: '100%', gap: 5 }]}>
          <FormProvider {...formApi}>
            <FormField
              label={i18n.t('fields.firstName.label')}
              name="firstName"
              type="text"
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
