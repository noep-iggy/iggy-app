import { View, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { AnimalDto, TaskDto } from '@/types';
import { ApiService } from '@/api';
import { genericStyles } from '@/constants';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { animalAnimationResolver } from '@/utils/animal';
import LottieView from 'lottie-react-native';
import TaskAnimalCard from '@/components/Card/TaskAnimalCard';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, useTheme } from 'react-native-paper';

const AnimalDetail = () => {
  const params = useLocalSearchParams();
  const [animal, setAnimal] = useState<AnimalDto>();
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTasksLoading, setIsTasksLoading] = useState(true);
  const theme = useTheme();

  async function fetchAnimal() {
    if (!params) return;
    setIsLoading(true);
    const animalFetched = await ApiService.animals.getById(params.id as string);
    setAnimal(animalFetched);
    setIsLoading(false);
  }

  async function fetchTasks() {
    if (!params || !animal?.tasks) return;
    setIsTasksLoading(true);
    const tasksFetched = await Promise.all(
      animal?.tasks.map((taskId: string) => ApiService.tasks.getById(taskId))
    );
    setTasks(tasksFetched);
    setIsTasksLoading(false);
  }

  useEffect(() => {
    fetchAnimal();
  }, [params]);

  useEffect(() => {
    fetchTasks();
  }, [animal]);

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
          <ScrollView style={{ width: '100%' }} contentContainerStyle={{}}>
            {isTasksLoading ? (
              <ActivityIndicator animating={isTasksLoading} />
            ) : (
              tasks.map((task) => <TaskAnimalCard key={task.id} task={task} />)
            )}
          </ScrollView>
        </View>
      )}
    </UniversalSafeArea>
  );
};

export default AnimalDetail;
