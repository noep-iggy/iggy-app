import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { genericStyles } from '@/constants';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { AnimalDto, CreateTaskApi, TaskRecurrenceEnum, UserDto } from '@/types';
import { taskValidation } from '@/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { useTheme, Text } from 'react-native-paper';
import { ApiService } from '@/api';
import i18n from '@/locales/localization';
import { ROUTES } from '@/router/routes';
import { formatValidationErrorMessage } from '@/utils/error';
import Toast from 'react-native-toast-message';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import FormField from '@/components/Forms/FormField';
import { Select, SelectDate, SelectMultipleChip } from '@/components/Selects';
import { useEffect, useState } from 'react';

const TaskCreate = () => {
  const router = useRouter();
  const theme = useTheme();
  const [users, setUsers] = useState<UserDto[]>([]);
  const [animals, setAnimals] = useState<AnimalDto[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(true);
  const [isLoadingAnimals, setIsLoadingAnimals] = useState<boolean>(true);

  const formApi = useForm<CreateTaskApi>({
    resolver: yupResolver(taskValidation.create),
    mode: 'onTouched',
  });

  const { handleSubmit, formState, setError } = formApi;
  const { isSubmitting, isValid } = formState;

  async function onSubmit(data: CreateTaskApi) {
    try {
      await ApiService.tasks.create(data);
      Toast.show({
        type: 'success',
        text1: i18n.t('success.api.task.create'),
      });
      router.replace(ROUTES.dashboard.parent);

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

  async function fetchUsers() {
    setIsLoadingUsers(true);
    const usersfetched = await ApiService.house.getUsers();
    setUsers(usersfetched);
    setIsLoadingUsers(false);
  }

  async function fetchAnimals() {
    setIsLoadingAnimals(true);
    const animalsfetched = await ApiService.house.getAnimals();
    setAnimals(animalsfetched);
    setIsLoadingAnimals(false);
  }

  useEffect(() => {
    fetchUsers();
    fetchAnimals();
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
            justifyContent: 'space-between',
            padding: 16,
          },
        ]}
        asView
      >
        <View>
          <Text
            variant="titleMedium"
            style={{ textAlign: 'center', marginVertical: 15 }}
          >
            {i18n.t('tasks.create.subtitle')}
          </Text>
          <View style={[genericStyles.flexColumn, { width: '100%', gap: 6 }]}>
            <FormProvider {...formApi}>
              <FormField
                label={i18n.t('fields.title.label')}
                name="title"
                type="text"
              />
              <FormField
                label={i18n.t('fields.description.label')}
                name="description"
                type="multiline"
              />
              <SelectDate
                name="date"
                placeholder={i18n.t('fields.date.placeholder')}
                mode="datetime"
              />
              <SelectMultipleChip
                isLoading={isLoadingUsers}
                name="userIds"
                items={users.map((u) => ({
                  label: `${u.firstName}`,
                  value: u.id,
                }))}
                label={i18n.t('fields.users.label')}
              />
              <SelectMultipleChip
                isLoading={isLoadingAnimals}
                name="animalIds"
                items={animals.map((a) => ({
                  label: `${a.name}`,
                  value: a.id,
                }))}
                label={i18n.t('fields.animals.label')}
              />
              <Select
                name="recurrence"
                items={Object.values(TaskRecurrenceEnum).map((v) => ({
                  label: i18n.t(`enums.recurrence.type.${v}`),
                  value: v,
                }))}
                placeholder={i18n.t('fields.recurrence.label')}
                style={{ marginTop: 10 }}
              />
            </FormProvider>
          </View>
        </View>
        <PrimaryButton
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          title={i18n.t('tasks.create.submit')}
          big
          style={{ marginBottom: 16 }}
        />
      </UniversalSafeArea>
    </KeyboardAvoidingView>
  );
};

export default TaskCreate;
