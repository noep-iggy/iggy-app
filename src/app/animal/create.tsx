import { useRouter } from 'expo-router';
import { Image, View } from 'react-native';
import { genericStyles } from '@/constants';
import { Icon, MD3Colors, useTheme } from 'react-native-paper';
import FormField from '@/components/Forms/FormField';
import i18n from '@/locales/localization';
import { AnimalGenderEnum, AnimalTypeEnum, CreateAnimalApi } from '@/types';
import { formatValidationErrorMessage } from '@/utils/error';
import { animalValidation } from '@/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import SecondaryButton from '@/components/Buttons/SecondaryButton';
import { Select, SelectDate } from '@/components/Selects';
import { ApiService } from '@/api';
import LottieView from 'lottie-react-native';
import { animalAnimationResolver } from '@/utils/animal';

const AnimalCreate = () => {
  const theme = useTheme();
  const formApi = useForm<CreateAnimalApi>({
    resolver: yupResolver(animalValidation.create),
    defaultValues: {
      name: '',
      type: AnimalTypeEnum.DOG,
    },
    mode: 'onTouched',
  });

  const { handleSubmit, formState, setError, setValue, watch } = formApi;
  const { isSubmitting, isValid } = formState;

  const router = useRouter();

  async function onSubmit(data: CreateAnimalApi) {
    try {
      await ApiService.animals.create(data);
      router.back();
      router.setParams({ refresh: 'true' });

      Toast.show({
        type: 'success',
        text1: i18n.t('success.api.animal.create'),
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

  const ANIMALS = [
    {
      id: 0,
      url: require('@/assets/images/dog.png'),
      type: AnimalTypeEnum.DOG,
    },
    {
      id: 1,
      url: require('@/assets/images/chat.png'),
      type: AnimalTypeEnum.CAT,
    },
    {
      id: 2,
      url: require('@/assets/images/rabbit.png'),
      type: AnimalTypeEnum.CAT,
    },
    {
      id: 3,
      url: require('@/assets/images/horse.png'),
      type: AnimalTypeEnum.CAT,
    },
    {
      id: 4,
      url: require('@/assets/images/mousse.png'),
      type: AnimalTypeEnum.CAT,
    },
  ];

  const ANIMALS_AVAIABLE = [0, 1];
  const animalSelected = ANIMALS.find((v) => v.type === watch('type'));

  return (
    <UniversalSafeArea
      style={[
        {
          justifyContent: 'space-between',
          padding: 16,
        },
      ]}
      asView
    >
      <View style={[genericStyles.colCenter, { marginTop: 30, width: '100%' }]}>
        <LottieView
          autoPlay={true}
          source={animalAnimationResolver(
            animalSelected?.type ?? AnimalTypeEnum.DOG
          )}
          style={{ width: 300, height: 300 }}
        />
        <View
          style={[
            genericStyles.flexRow,
            { justifyContent: 'space-around', marginTop: 30, width: '100%' },
          ]}
        >
          {ANIMALS.map((animal) => (
            <View
              onTouchEnd={() => {
                if (ANIMALS_AVAIABLE.includes(animal.id)) {
                  setValue('type', animal.type);
                }
              }}
              key={animal.id}
              style={{
                width: 60,
                height: 60,
                borderWidth: 1,
                borderColor:
                  animalSelected === animal ? theme.colors.primary : 'grey',
                borderRadius: 10,
                padding: 5,
                backgroundColor:
                  animalSelected === animal
                    ? theme.colors.primary
                    : 'transparent',
              }}
            >
              <Image
                source={animal.url}
                style={{
                  width: '100%',
                  height: '100%',
                  opacity: ANIMALS_AVAIABLE.includes(animal.id) ? 1 : 0.2,
                }}
                resizeMode="contain"
              />
              <View
                style={{
                  position: 'absolute',
                  display: ANIMALS_AVAIABLE.includes(animal.id)
                    ? 'none'
                    : 'flex',
                  width: '100%',
                  height: '100%',
                  borderRadius: 10,
                  left: 5,
                  top: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon
                  source="close-octagon"
                  color={MD3Colors.error50}
                  size={20}
                />
              </View>
            </View>
          ))}
        </View>
        <View
          style={[
            genericStyles.flexColumn,
            { width: '100%', gap: 15, marginTop: 20 },
          ]}
        >
          <FormProvider {...formApi}>
            <FormField
              label={i18n.t('fields.name.label')}
              name="name"
              type="text"
            />
            <View
              style={[
                genericStyles.flexRow,
                { justifyContent: 'space-between' },
              ]}
            >
              <Select
                name="gender"
                items={Object.values(AnimalGenderEnum).map((v) => ({
                  label: i18n.t(`enums.gender.${v}`),
                  value: v,
                }))}
                style={{
                  width: '48%',
                }}
                placeholder="Sexe"
              />
              <SelectDate
                name="bornDate"
                style={{
                  width: '48%',
                }}
                placeholder="Âge"
              />
            </View>
          </FormProvider>
        </View>
        <View
          style={[
            genericStyles.flexRow,
            { justifyContent: 'space-between', marginTop: 30, gap: 10 },
          ]}
        >
          <SecondaryButton
            onPress={router.back}
            title={i18n.t('generics.back')}
            big
          />
          <PrimaryButton
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
            onPress={handleSubmit(onSubmit)}
            title={i18n.t('registerPage.animal.submit')}
            big
          />
        </View>
      </View>
    </UniversalSafeArea>
  );
};

export default AnimalCreate;
