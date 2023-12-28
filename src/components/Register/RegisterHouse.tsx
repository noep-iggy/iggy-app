import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { genericStyles } from '@/constants';
import i18n from '@/locales/localization';
import { CreateHouseApi } from '@/types';
import { houseValidation } from '@/validations';
import { Image, View } from 'react-native';
import { Text } from 'react-native-paper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { ApiService } from '@/api';
import FormField from '@/components/Forms/FormField';
import { formatValidationErrorMessage } from '@/utils/error';
import Toast from 'react-native-toast-message';
import { useAuthContext } from '@/contexts';
import { useEffect } from 'react';

interface RegisterHouseProps {
  setCurrentStep: (step: number) => void;
}

export function RegisterHouse(props: RegisterHouseProps): JSX.Element {
  const { setCurrentStep } = props;
  const logo = require('@/assets/images/app/logo-color.png');
  const { currentUser } = useAuthContext();

  const formApi = useForm<CreateHouseApi>({
    resolver: yupResolver(houseValidation.create),
    defaultValues: {
      name: '',
    },
    mode: 'onTouched',
  });

  useEffect(() => {
    console.log('[D] RegisterHouse', currentUser);
  }, [currentUser]);

  const { handleSubmit, formState, setError } = formApi;
  const { isSubmitting, isValid } = formState;

  async function onSubmit(data: CreateHouseApi) {
    try {
      await ApiService.house.create(data);

      Toast.show({
        type: 'success',
        text1: i18n.t('success.api.house.create'),
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
          genericStyles.flexCenter,
          { width: '100%', gap: 10, flexGrow: 1 },
        ]}
      >
        <Image source={logo} resizeMode="contain" style={{ width: 150 }} />
        <Text variant="bodyMedium" style={{ textAlign: 'center' }}>
          {i18n.t('housePage.create.subtitle')}
        </Text>
        <View style={[genericStyles.flexColumn, { width: '100%', gap: 5 }]}>
          <FormProvider {...formApi}>
            <FormField
              label={i18n.t('fields.name.label')}
              name="name"
              type="text"
            />
          </FormProvider>
        </View>
      </View>

      <PrimaryButton
        disabled={!isValid || isSubmitting}
        loading={isSubmitting}
        onPress={handleSubmit(onSubmit)}
        title={i18n.t('housePage.create.submit')}
        textColor="white"
        big
        style={{ marginTop: 20 }}
      />
    </>
  );
}
