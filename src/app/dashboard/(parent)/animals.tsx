import { View, ActivityIndicator, Image, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { AnimalDto } from '@/types';
import { ApiService } from '@/api';
import { genericStyles } from '@/constants';
import { animalResolver } from '@/utils/animal';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { useTheme, Text } from 'react-native-paper';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { router } from 'expo-router';
import { ROUTES } from '@/router/routes';

const Pets = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
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

  return isLoading ? (
    <View style={[genericStyles.flexCenter, { height: '100%' }]}>
      <ActivityIndicator animating={isLoading} />
    </View>
  ) : (
    <UniversalSafeArea asView>
      <ScrollView>
        <View style={{ marginHorizontal: 16, marginTop: 32 }}>
          {animals.map((animal) => (
            <View
              key={animal.id}
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
            </View>
          ))}
          <PrimaryButton
            title="Ajouter"
            icon="plus"
            style={{
              marginTop: 16,
              height: 50,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            onPress={() => {
              router.push(ROUTES.animal.create);
            }}
          />
        </View>
      </ScrollView>
    </UniversalSafeArea>
  );
};

export default Pets;
