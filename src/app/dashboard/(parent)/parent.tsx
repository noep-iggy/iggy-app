import { Text, useTheme } from 'react-native-paper';
import { useEffect, useState } from 'react';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { ScrollView } from 'react-native-gesture-handler';
import PetCard from '@/components/ParentDashboard/PetCard';
import AddPetCard from '@/components/ParentDashboard/AddPetCard';
import { ActivityIndicator, View } from 'react-native';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { useAuthContext } from '@/contexts';
import { AnimalDto, TaskDto, TaskStatusEnum } from '@/types';
import { ApiService } from '@/api';
import TaskAnimalCard from '@/components/Card/TaskAnimalCard';
import { ROUTES } from '@/router/routes';
import { router } from 'expo-router';
import i18n from '@/locales/localization';

// TODO: call api to get the list of pets
const ParentDashboard = () => {
  const theme = useTheme();
  const { currentUser } = useAuthContext();
  const [animals, setAnimals] = useState<AnimalDto[]>([]);
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [isLoadingAnimals, setIsLoadingAnimals] = useState<boolean>(true);
  const [isLoadingTasks, setIsLoadingTasks] = useState<boolean>(true);

  async function fetchAnimals() {
    setIsLoadingAnimals(true);
    const animalFetched = await ApiService.house.getAnimals();
    setAnimals(animalFetched);
    setIsLoadingAnimals(false);
  }

  async function fetchTasks() {
    setIsLoadingTasks(true);
    const taskFetched = await ApiService.tasks.getByStatus(TaskStatusEnum.TODO);
    setTasks(taskFetched);
    setIsLoadingTasks(false);
  }

  useEffect(() => {
    fetchAnimals();
    fetchTasks();
  }, []);

  return (
    <UniversalSafeArea asView>
      <ScrollView>
        <View style={{ marginHorizontal: 16, marginTop: 32 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
              justifyContent: 'space-between',
            }}
          >
            <Text variant="headlineMedium" style={{ fontWeight: 'bold' }}>
              Animaux
            </Text>
            <PrimaryButton
              title="Ajouter"
              icon="plus"
              onPress={() => {
                router.push(ROUTES.animal.create);
              }}
            />
          </View>
        </View>
        {isLoadingAnimals ? (
          <ActivityIndicator animating={isLoadingAnimals} />
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
          >
            {animals.map((animal) => (
              <PetCard key={animal.id} animal={animal} />
            ))}
            <AddPetCard />
          </ScrollView>
        )}
        <View style={{ marginHorizontal: 16, marginTop: 32 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
              justifyContent: 'space-between',
            }}
          >
            <Text variant="headlineMedium" style={{ fontWeight: 'bold' }}>
              Tâches
            </Text>
            <PrimaryButton
              title="Ajouter"
              icon="plus"
              onPress={() => {
                router.push(ROUTES.task.create);
              }}
            />
          </View>
          {isLoadingTasks ? (
            <ActivityIndicator animating={isLoadingTasks} />
          ) : tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskAnimalCard isAnimalVisible key={task.id} task={task} />
            ))
          ) : (
            <Text
              variant="bodyMedium"
              style={{ textAlign: 'left', width: '100%', marginBottom: 15 }}
            >
              {i18n.t('tasks.noTasks')}
            </Text>
          )}
        </View>
      </ScrollView>
    </UniversalSafeArea>
  );
};

export default ParentDashboard;
