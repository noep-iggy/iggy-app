import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { useAuthContext } from '@/contexts';
import { ROUTES } from '@/router/routes';
import { router, useFocusEffect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, View, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  ActivityIndicator,
  Icon,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { animalAnimationResolver } from '@/utils/animal';
import {
  AnimalDto,
  AnimalTypeEnum,
  TaskDto,
  TaskPeriodEnum,
  TaskStatusEnum,
} from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { ApiService } from '@/api';
import ChildPetSlide from '@/components/Card/ChildPetSlide';
import ChildTaskCard from '@/components/Card/ChildTaskCard';
import i18n from '@/locales/localization';
import { set } from 'react-hook-form';

const ChildDashboard = () => {
  const splashImage = require('@/assets/images/app/splash.png');
  const { removeToken, currentUser } = useAuthContext();
  const theme = useTheme();
  const { width: windowWidth } = useWindowDimensions();
  const [animals, setAnimals] = useState<AnimalDto[]>([]);
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentAnimal, setCurrentAnimal] = useState<AnimalDto>();

  async function fetchAnimals() {
    const animalsFetched = await ApiService.house.getAnimals();
    setAnimals(animalsFetched);
    setCurrentAnimal(animalsFetched[0]);
  }

  async function fetchTasks(index: number = 0) {
    setIsLoading(true);
    const tasksFetched = await ApiService.tasks.getAll({
      status: TaskStatusEnum.TODO,
      date: TaskPeriodEnum.TODAY,
      animalId: animals[index]?.id,
      userId: currentUser?.id,
      orderBy: 'date',
      orderType: 'ASC',
    });
    setTasks(tasksFetched);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchAnimals();
  }, []);

  useEffect(() => {
    if (animals.length > 0) {
      fetchTasks();
    }
  }, [animals]);

  return (
    <>
      <StatusBar style="light" />
      <ImageBackground
        resizeMode="cover"
        source={splashImage}
        style={{ height: '100%', width: '100%' }}
      >
        <UniversalSafeArea style={{ backgroundColor: 'transparent' }}>
          <View
            style={{
              flexDirection: 'column',
              gap: 16,
              height: '100%',
            }}
          >
            <TouchableRipple
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 1,
              }}
              onPress={() => {
                router.push(ROUTES.settings.childSettings);
              }}
            >
              <Icon source="cog" size={24} color="white" />
            </TouchableRipple>
            <ScrollView
              horizontal
              decelerationRate={0}
              snapToInterval={windowWidth}
              snapToAlignment="center"
              onScroll={(e) => {
                const index = Math.round(
                  e.nativeEvent.contentOffset.x /
                    e.nativeEvent.layoutMeasurement.width
                );
                setTimeout(() => {
                  setIsLoading(true);
                  setCurrentAnimal(animals[index]);
                  if (currentAnimal?.id !== animals[index]?.id) {
                    fetchTasks(index);
                  }
                  setIsLoading(false);
                }, 100);
              }}
              scrollEventThrottle={16}
            >
              {animals.map((animal, index) => (
                <ChildPetSlide
                  key={index}
                  animal={animal}
                  cardWidth={windowWidth}
                />
              ))}
            </ScrollView>
            <Surface
              style={{
                backgroundColor: theme.colors.surface,
                padding: 16,
                paddingBottom: 38,
                borderRadius: 8,
                maxHeight: 175,
                marginHorizontal: 16,
                gap: 12,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Text
                  variant="titleLarge"
                  style={{
                    fontWeight: '500',
                    color: theme.colors.onSurface,
                    minHeight: 0,
                  }}
                >
                  {i18n.t('tasks.todo')}
                </Text>
                <View>
                  <Icon
                    size={48}
                    source="octagram"
                    color={theme.colors.inversePrimary}
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      top: '50%',
                      color: theme.colors.onPrimaryContainer,
                      textAlign: 'center',
                      transform: [{ translateY: -10 }],
                      fontWeight: 'bold',
                      width: 48,
                      fontSize: 16,
                    }}
                  >
                    {tasks.length > 9 ? '9+' : tasks.length}
                  </Text>
                </View>
              </View>
              <View>
                {!tasks.length && !isLoading ? (
                  <Text
                    variant="bodyLarge"
                    style={{
                      textAlign: 'center',
                      color: theme.colors.onSurface,
                    }}
                  >
                    {i18n.t('tasks.noTasks')}
                  </Text>
                ) : (
                  tasks
                    .slice(0, 2)
                    .map((task, index) => (
                      <ChildTaskCard
                        key={index}
                        task={task}
                        isSecondary={index === 1}
                      />
                    ))
                )}
                {isLoading && <ActivityIndicator size="small" />}
              </View>
            </Surface>
          </View>
        </UniversalSafeArea>
      </ImageBackground>
    </>
  );
};

export default ChildDashboard;
