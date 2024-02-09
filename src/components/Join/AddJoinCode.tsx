import i18n from '@/locales/localization';
import { Image, View } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { ApiService } from '@/api';
import Toast from 'react-native-toast-message';
import { formatValidationErrorMessage } from '@/utils/error';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { errorMessage } from '@/errors';
import { genericStyles } from '@/constants';
import FormField from '../Forms/FormField';
import { JoinCodeDto } from '@/types';
import { useEffect } from 'react';
import * as Clipboard from 'expo-clipboard';
import PrimaryButton from '../Buttons/PrimaryButton';
import { useAppTheme } from '@/app/_layout';

interface AddJoinCodeProps {
  setCurrentStep: (step: number) => void;
  setCode: (code?: JoinCodeDto) => void;
}

export function AddJoinCode(props: AddJoinCodeProps): JSX.Element {
  const { setCurrentStep, setCode } = props;
  const logo = require('@/assets/images/app/logo-color.png');
  const formApi = useForm<{ code: string }>({
    resolver: yupResolver(
      yup.object({
        code: yup
          .string()
          .typeError(errorMessage.fields('code').NOT_NUMBER)
          .required(errorMessage.fields('code').REQUIRED)
          .min(6, errorMessage.fields('code').TOO_SHORT)
          .max(6, errorMessage.fields('code').TOO_LONG),
      })
    ),
    mode: 'onSubmit',
  });

  const { handleSubmit, formState, setError, watch } = formApi;
  const { isSubmitting, isValid } = formState;
  const theme = useAppTheme();

  async function onSubmit(data: { code: string }) {
    try {
      const joinCode = await ApiService.joinCode.getByCode(data.code);
      if (!joinCode.code) {
        Toast.show({
          type: 'error',
          text1: i18n.t('errors.api.title'),
          text2: i18n.t('errors.api.house.notFound'),
        });
        setError('code', { message: errorMessage.fields('code').NOT_VALID });
      } else {
        Toast.show({
          type: 'success',
          text1: i18n.t('success.api.house.find'),
        });
        setCurrentStep(1);
        setCode(joinCode);
      }
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

  useEffect(() => {
    if (!isValid || isSubmitting) {
      const code = watch('code');
      if (code.length === 6) {
        handleSubmit(onSubmit)();
      }
    }
  }, [watch('code')]);

  async function pastJoinCode() {
    const code = await Clipboard.getStringAsync();
    await Clipboard.setStringAsync(code);
    if (code.length !== 6) {
      Toast.show({
        type: 'error',
        text1: i18n.t('errors.api.title'),
        text2: i18n.t('errors.api.house.notFound'),
      });
      return;
    }
    formApi.reset({ code });
  }

  return (
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
      <ActivityIndicator
        animating={isSubmitting}
        color={theme.colors.primary}
      />
      <Text variant="bodyMedium" style={{ textAlign: 'center' }}>
        {i18n.t('joinPage.add.title')}
      </Text>
      <View style={[genericStyles.flexColumn, { width: '100%', gap: 5 }]}>
        <FormProvider {...formApi}>
          <FormField
            label={i18n.t('joinPage.add.code')}
            name="code"
            type="code"
          />
        </FormProvider>

        <Text
          variant="titleLarge"
          style={{
            textAlign: 'center',
            marginTop: 10,
            textTransform: 'uppercase',
          }}
        >
          {i18n.t('generics.or')}
        </Text>

        <PrimaryButton
          style={{
            marginTop: 10,
            alignSelf: 'center',
          }}
          loading={isSubmitting}
          icon="clipboard-arrow-down"
          title={i18n.t('joinCode.past')}
          onPress={pastJoinCode}
        />
      </View>
    </View>
  );
}
