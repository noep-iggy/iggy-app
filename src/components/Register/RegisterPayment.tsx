import { genericStyles } from '@/constants';
import i18n from '@/locales/localization';
import { ROUTES } from '@/router/routes';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { Checkbox, Switch, Text, ActivityIndicator } from 'react-native-paper';
import PrimaryButton from '../Buttons/PrimaryButton';
import { BillingPlanDto, BillingPlanTypeEnum } from '@/types';
import { ApiService } from '@/api';
import { ScrollView } from 'react-native-gesture-handler';
import { useAppTheme } from '@/app/_layout';

export interface RegisterPaymentProps {
  setCurrentStep: (step: number) => void;
  purshaseType: BillingPlanTypeEnum;
  setPurshaseType: (type: BillingPlanTypeEnum) => void;
}

export function RegisterPayment(props: RegisterPaymentProps): JSX.Element {
  const { setCurrentStep, purshaseType, setPurshaseType } = props;
  const theme = useAppTheme();
  const router = useRouter();
  const logo = require('@/assets/images/app/logo.png');
  const [isCguChecked, setIsCguChecked] = useState<boolean>(false);
  const [billingPlan, setBillingPlan] = useState<BillingPlanDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function fetchBillingPlan() {
    setIsLoading(true);
    const billingPlan = await ApiService.billingPlans.getAll();
    setBillingPlan(billingPlan);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchBillingPlan();
  }, []);

  return (
    <ScrollView>
      <View
        style={[
          genericStyles.flexColumn,
          { alignItems: 'center', padding: 16 },
        ]}
      >
        <Image source={logo} style={{ height: 50 }} resizeMode="contain" />
        <Text
          variant="bodyMedium"
          style={{ color: 'white', marginVertical: 20 }}
        >
          {i18n.t('registerPage.payment.title')}
        </Text>
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 8,
            paddingHorizontal: 8,
            paddingVertical: 16,
            justifyContent: 'center',
          }}
        >
          <Text variant="bodyMedium" style={{ fontWeight: 'bold', padding: 8 }}>
            {i18n.t('registerPage.payment.try')}
          </Text>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text
              variant="displayMedium"
              style={{
                color: theme.colors.primary,
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              {purshaseType === BillingPlanTypeEnum.MONTHLY
                ? `${
                    billingPlan?.find(
                      (b) => b.type === BillingPlanTypeEnum.MONTHLY
                    )?.price ?? 0
                  }€ / ${i18n.t('generics.month')}`
                : `${
                    billingPlan?.find(
                      (b) => b.type === BillingPlanTypeEnum.FOR_LIFE
                    )?.price ?? 0
                  }€`}
            </Text>
          )}
          <View
            style={[
              genericStyles.flexRow,
              {
                justifyContent: 'center',
                gap: 10,
                marginTop: 20,
              },
            ]}
          >
            <Text
              variant="bodyLarge"
              style={{
                color:
                  purshaseType === BillingPlanTypeEnum.MONTHLY
                    ? theme.colors.primary
                    : theme.colors.outline,
                fontWeight: 'bold',
              }}
            >
              {i18n.t('generics.try')}
            </Text>
            <Switch
              value={purshaseType === BillingPlanTypeEnum.FOR_LIFE}
              onValueChange={() =>
                setPurshaseType(
                  purshaseType === BillingPlanTypeEnum.FOR_LIFE
                    ? BillingPlanTypeEnum.MONTHLY
                    : BillingPlanTypeEnum.FOR_LIFE
                )
              }
              color={theme.colors.primary}
            />
            <Text
              variant="bodyLarge"
              style={{
                color:
                  purshaseType === BillingPlanTypeEnum.FOR_LIFE
                    ? theme.colors.primary
                    : theme.colors.outline,
                fontWeight: 'bold',
              }}
            >
              {i18n.t('generics.adopt')}
            </Text>
          </View>
          <View
            style={[
              genericStyles.flexRow,
              { justifyContent: 'center', alignItems: 'center', marginTop: 40 },
            ]}
          >
            <Checkbox.Android
              status={isCguChecked ? 'checked' : 'unchecked'}
              color={theme.colors.primary}
              onPress={() => setIsCguChecked(!isCguChecked)}
            />
            <View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
              <Text variant="bodyMedium">
                {i18n.t('registerPage.payment.accept.part1')}
              </Text>
              <Text
                onPress={() => router.push(ROUTES.settings.cgu)}
                variant="bodyMedium"
                style={{ color: theme.colors.primary }}
              >
                {i18n.t('registerPage.payment.accept.part2')}
              </Text>
              <Text variant="bodyMedium">
                {i18n.t('registerPage.payment.accept.part3')}
              </Text>
              <Text
                style={{ color: theme.colors.primary }}
                onPress={() => router.push(ROUTES.settings.cgu)}
                variant="bodyMedium"
              >
                {i18n.t('registerPage.payment.accept.part4')}
              </Text>
              <Text variant="bodyMedium">
                {i18n.t('registerPage.payment.accept.part5')}
              </Text>
            </View>
          </View>
          <PrimaryButton
            title={i18n.t('registerPage.payment.submit')}
            buttonColor={theme.colors.primary}
            textColor="white"
            style={{ alignSelf: 'center', marginVertical: 50 }}
            onPress={() => setCurrentStep(1)}
            disabled={!isCguChecked}
            big
          />
        </View>
      </View>
    </ScrollView>
  );
}
