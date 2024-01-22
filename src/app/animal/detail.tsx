import { View, ActivityIndicator } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { AnimalDto, TaskDto } from '@/types';
import { ApiService } from '@/api';
import { genericStyles } from '@/constants';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { animalAnimationResolver } from '@/utils/animal';
import LottieView from 'lottie-react-native';
import TaskAnimalCard from '@/components/Card/TaskAnimalCard';
import { Text } from 'react-native-paper';
import i18n from '@/locales/localization';
import { RefreshScroll } from '@/components/Scroll';

const AnimalDetail = () => {
  const params = useLocalSearchParams();
  const [animal, setAnimal] = useState<AnimalDto>();
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTasksLoading, setIsTasksLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState<number>(0);

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
    const tasksFetched = await ApiService.tasks.getAnimalTasks(
      params.id as string,
      {
        page: newPageNumber,
        pageSize: 10,
      }
    );
    setPageNumber(newPageNumber);
    setTasks((existingTasks) => [...existingTasks, ...tasksFetched]);
    setIsTasksLoading(false);
  }

  useEffect(() => {
    fetchAnimal();
  }, [params]);

  useFocusEffect(
    useCallback(() => {
      setTasks([]);
      setPageNumber(0);
      fetchTasks(0);
    }, [params])
  );

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
      <Stack.Screen
        options={{
          headerTitle: animal?.name,
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
            {'Tâches assigées :'}
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
  );
};

export default AnimalDetail;
