import { ApiService } from '@/api';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import SecondaryButton from '@/components/Buttons/SecondaryButton';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import FormField from '@/components/Forms/FormField';
import { Select } from '@/components/Selects';
import { genericStyles } from '@/constants';
import i18n from '@/locales/localization';
import { BillingPlanTypeEnum, UpdateHouseApi } from '@/types';
import { formatValidationErrorMessage } from '@/utils/error';
import { houseValidation } from '@/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Toast from 'react-native-toast-message';

const HouseUpdate = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const formApi = useForm<UpdateHouseApi>({
    resolver: yupResolver(houseValidation.update),
    mode: 'onTouched',
  });

  const { handleSubmit, formState, setError } = formApi;
  const { isSubmitting, isValid } = formState;

  async function onSubmit(data: UpdateHouseApi) {
    try {
      await ApiService.house.update(data);

      Toast.show({
        type: 'success',
        text1: i18n.t('success.api.house.update'),
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

  async function fecthHouse() {
    setIsLoading(true);
    const houseFetched = await ApiService.house.get();
    formApi.reset({
      name: houseFetched?.name,
      billingPlan: houseFetched?.billingPlan,
    });
    setIsLoading(false);
  }

  useEffect(() => {
    fecthHouse();
  }, []);

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
              <FormField
                label={i18n.t('fields.name.label')}
                name="name"
                type="text"
              />
              <Select
                placeholder={i18n.t('fields.billingPlan.label')}
                name="billingPlan"
                items={Object.values(BillingPlanTypeEnum).map((value) => ({
                  label: i18n.t(`enums.billingPlan.${value}`),
                  value,
                }))}
              />
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

export default HouseUpdate;
