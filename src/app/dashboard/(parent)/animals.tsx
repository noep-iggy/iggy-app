import { View, Image, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { AnimalDto } from '@/types';
import { ApiService } from '@/api';
import { genericStyles } from '@/constants';
import { animalResolver } from '@/utils/animal';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { useTheme, Text } from 'react-native-paper';
import { router } from 'expo-router';
import { ROUTES } from '@/router/routes';
import { RefreshScroll } from '@/components/Scroll';
import { ButtonsAction } from '@/components/Actions/ButtonsAction';

const Pets = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [animals, setAnimals] = useState<AnimalDto[]>([]);

  async function fetchAnimals() {
    setIsLoading(true);
    const animalFetched = await ApiService.house.getAnimals();
    setAnimals(animalFetched);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchAnimals();
  }, []);

  return (
    <UniversalSafeArea asView>
      <RefreshScroll
        isEmpty={animals.length === 0}
        isLoading={isLoading}
        onRefresh={() => fetchAnimals()}
      >
        <View style={{ marginHorizontal: 16, marginTop: 32 }}>
          {animals.map((animal) => (
            <TouchableOpacity
              key={animal.id}
              onPress={() => {
                router.push(ROUTES.animal.detail);
                router.setParams({ id: animal?.id ?? '0' });
              }}
              style={[
                genericStyles.flexRow,
                {
                  width: '100%',
                  marginBottom: 16,
                  borderRadius: 8,
                  padding: 10,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 5 },
                  shadowOpacity: 0.3,
                  shadowRadius: 6,
                  backgroundColor: theme.colors.surfaceVariant,
                },
              ]}
            >
              <Image
                style={{
                  width: 50,
                  height: 50,
                }}
                source={animalResolver(animal.type)}
              />
              <View
                style={[
                  genericStyles.flexColumn,
                  {
                    marginLeft: 15,
                    flex: 1,
                    justifyContent: 'center',
                  },
                ]}
              >
                <Text
                  variant="headlineSmall"
                  style={{
                    fontWeight: 'bold',
                    color: theme.colors.primary,
                  }}
                >
                  {animal.name}
                </Text>
                <Text variant="bodyMedium" style={{ marginTop: 5 }}>
                  Tâche(s) en attente : {animal?.tasks?.length ?? 0}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </RefreshScroll>
      <ButtonsAction onPress={() => router.push(ROUTES.animal.create)} />
    </UniversalSafeArea>
  );
};

export default Pets;
