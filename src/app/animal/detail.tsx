import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useState, useCallback } from 'react';
import {
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from 'expo-router';
import { AnimalDto, TaskDto, TaskPeriodEnum } from '@/types';
import { ApiService } from '@/api';
import { genericStyles } from '@/constants';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { animalAnimationResolver } from '@/utils/animal';
import LottieView from 'lottie-react-native';
import TaskAnimalCard from '@/components/Card/TaskAnimalCard';
import { Icon, Text, useTheme } from 'react-native-paper';
import i18n from '@/locales/localization';
import { RefreshScroll } from '@/components/Scroll';
import { ROUTES } from '@/router/routes';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Toast from 'react-native-toast-message';
import { DeleteDialog } from '@/components/Dialog/DeleteDialog';

const AnimalDetail = () => {
  const router = useRouter();
  const theme = useTheme();
  const { showActionSheetWithOptions } = useActionSheet();
  const params = useLocalSearchParams();
  const [animal, setAnimal] = useState<AnimalDto>();
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTasksLoading, setIsTasksLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  async function fetchAnimal() {
    if (!params) return;
    setIsLoading(true);
    const animalFetched = await ApiService.animals.getById(params.id as string);
    setAnimal(animalFetched);
    setIsLoading(false);
  }

  async function fetchTasks(newPageNumber = 0) {
    if (!params) return;
    setIsTasksLoading(true);
    const tasksFetched = await ApiService.tasks.getAll({
      page: newPageNumber,
      pageSize: 10,
      animalId: params.id as string,
      date: TaskPeriodEnum.TODAY,
    });
    setPageNumber(newPageNumber);
    setTasks((existingTasks) => [...existingTasks, ...tasksFetched]);
    setIsTasksLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchAnimal();
      setTasks([]);
      setPageNumber(0);
      fetchTasks(0);
    }, [params])
  );

  async function removeAnimal() {
    try {
      if (!animal) return;
      setIsLoading(true);
      await ApiService.animals.deleteById(animal.id);
      router.back();
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: i18n.t('success.api.animal.delete'),
      });
    } catch (e: any) {
      e?.data?.message &&
        Toast.show({
          type: 'error',
          text1: i18n.t('errors.api.title'),
          text2: i18n.t(`errors.${e?.data?.message}`),
        });
    }
  }

  const onPress = () => {
    const options = [
      i18n.t('generics.update'),
      i18n.t('generics.delete'),
      i18n.t('generics.cancel'),
    ];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        userInterfaceStyle: theme.dark ? 'dark' : 'light',
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        tintIcons: true,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            router.push(ROUTES.animal.update);
            router.setParams({ id: params.id as string });
            break;
          case destructiveButtonIndex:
            setIsConfirmVisible(true);
            break;
          case cancelButtonIndex:
        }
      }
    );
  };

  return (
    <>
      <UniversalSafeArea
        style={[
          {
            justifyContent: 'space-between',
            padding: 16,
          },
        ]}
        asView
      >
        <Stack.Screen
          options={{
            headerTitle: animal?.name,
            headerRight: () => (
              <TouchableOpacity onPress={onPress}>
                <Icon size={25} source="dots-vertical" />
              </TouchableOpacity>
            ),
          }}
        />

        {isLoading || animal === undefined ? (
          <View style={[genericStyles.flexCenter, { height: '100%' }]}>
            <ActivityIndicator animating={isLoading} />
          </View>
        ) : (
          <View
            style={[
              genericStyles.flexCenter,
              {
                justifyContent: 'flex-start',
                height: '100%',
                width: '100%',
              },
            ]}
          >
            <LottieView
              autoPlay={true}
              source={animalAnimationResolver(animal.type)}
              style={{ width: 300, height: 300 }}
            />
            <Text
              variant="headlineMedium"
              style={{ textAlign: 'left', width: '100%', marginBottom: 15 }}
            >
              {i18n.t('animals.detail.tasks')}
            </Text>
            <RefreshScroll
              style={{ width: '100%' }}
              isEmpty={tasks.length === 0}
              emptyText={i18n.t('tasks.noTasks')}
              isLoading={isTasksLoading}
              onNextPage={() => {
                fetchTasks(pageNumber + 1);
              }}
              onRefresh={() => {
                setTasks([]);
                fetchTasks(0);
              }}
            >
              {tasks.map((task) => (
                <TaskAnimalCard key={task.id} task={task} />
              ))}
            </RefreshScroll>
          </View>
        )}
      </UniversalSafeArea>
      <DeleteDialog
        visible={isConfirmVisible}
        onConfirm={() => {
          setIsConfirmVisible(false);
          removeAnimal();
        }}
        onCancel={() => setIsConfirmVisible(false)}
        title={i18n.t('animals.confirmDelete.title')}
        content={i18n.t('animals.confirmDelete.subtitle')}
      />
    </>
  );
};

export default AnimalDetail;
