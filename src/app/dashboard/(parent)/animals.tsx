import { View, Image, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { AnimalDto } from '@/types';
import { ApiService } from '@/api';
import { genericStyles } from '@/constants';
import { animalResolver } from '@/utils/animal';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { Text, TouchableRipple } from 'react-native-paper';
import { router } from 'expo-router';
import { ROUTES } from '@/router/routes';
import { RefreshScroll } from '@/components/Scroll';
import { ButtonsAction } from '@/components/Actions/ButtonsAction';
import { useAppTheme } from '@/app/_layout';

const Pets = () => {
  const theme = useAppTheme();
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
        <View style={{ margin: 16, gap: 8 }}>
          {animals.map((animal) => (
            <TouchableRipple
              key={animal.id}
              onPress={() => {
                router.push(ROUTES.animal.detail);
                router.setParams({ id: animal?.id ?? '0' });
              }}
              style={[
                genericStyles.flexRow,
                {
                  width: '100%',
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 24,
                  backgroundColor: theme.colors.surfaceVariant,
                },
              ]}
            >
              <>
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
                    variant="titleLarge"
                    style={{
                      color: theme.colors.primary,
                      fontWeight: 'bold',
                    }}
                    numberOfLines={1}
                  >
                    {animal.name}
                  </Text>
                  <Text variant="bodyMedium">
                    Tâche(s) en attente : {animal?.tasks?.length ?? 0}
                  </Text>
                </View>
              </>
            </TouchableRipple>
          ))}
        </View>
      </RefreshScroll>
      <ButtonsAction onPress={() => router.push(ROUTES.animal.create)} />
    </UniversalSafeArea>
  );
};

export default Pets;
