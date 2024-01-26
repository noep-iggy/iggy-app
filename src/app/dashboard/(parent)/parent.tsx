import { Text } from 'react-native-paper';
import { useCallback, useState } from 'react';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, View } from 'react-native';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { AnimalDto, TaskDto, TaskPeriodEnum } from '@/types';
import { ApiService } from '@/api';
import TaskAnimalCard from '@/components/Card/TaskAnimalCard';
import { ROUTES } from '@/router/routes';
import { router, useFocusEffect } from 'expo-router';
import i18n from '@/locales/localization';
import AddPetCard from '@/components/Card/AddPetCard';
import PetCard from '@/components/Card/PetCard';
import { RefreshScroll } from '@/components/Scroll';

const ParentDashboard = () => {
  const [animals, setAnimals] = useState<AnimalDto[]>([]);
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [isLoadingAnimals, setIsLoadingAnimals] = useState<boolean>(true);
  const [isLoadingTasks, setIsLoadingTasks] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(0);

  async function fetchAnimals() {
    setIsLoadingAnimals(true);
    const animalFetched = await ApiService.house.getAnimals();
    setAnimals(animalFetched);
    setIsLoadingAnimals(false);
  }

  async function fetchTasks(newPageNumber = 0) {
    setIsLoadingTasks(true);
    const tasksFetched = await ApiService.tasks.getAll({
      page: newPageNumber,
      pageSize: 10,
      date: TaskPeriodEnum.TODAY,
    });
    setPageNumber(newPageNumber);
    setTasks((existingTasks) => [...existingTasks, ...tasksFetched]);
    setIsLoadingTasks(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchTasks(0);
      setTasks([]);
      setPageNumber(0);
      fetchAnimals();
    }, [])
  );

  return (
    <UniversalSafeArea asView style={{ paddingHorizontal: 16 }}>
      <View style={{ marginTop: 16 }}>
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
        {isLoadingAnimals ? (
          <ActivityIndicator animating={isLoadingAnimals} />
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            {animals.map((animal) => (
              <PetCard key={animal.id} animal={animal} />
            ))}
            <AddPetCard />
          </ScrollView>
        )}
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 16,
          justifyContent: 'space-between',
        }}
      >
        <Text variant="headlineMedium" style={{ fontWeight: 'bold' }}>
          Tâches du jour
        </Text>
        <PrimaryButton
          title="Ajouter"
          icon="plus"
          onPress={() => {
            router.push(ROUTES.task.create);
          }}
        />
      </View>
      <RefreshScroll
        isEmpty={tasks.length === 0}
        emptyText={i18n.t('tasks.noTasks')}
        isLoading={isLoadingTasks}
        onNextPage={() => {
          fetchTasks(pageNumber + 1);
        }}
        onRefresh={() => {
          setTasks([]);
          fetchTasks(0);
        }}
      >
        {tasks.map((task) => (
          <TaskAnimalCard isAnimalVisible key={task.id} task={task} />
        ))}
      </RefreshScroll>
    </UniversalSafeArea>
  );
};

export default ParentDashboard;
