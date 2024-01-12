import { View, Text, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { AnimalDto } from '@/types';
import { ApiService } from '@/api';
import { genericStyles } from '@/constants';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';

const AnimalDetail = () => {
  const params = useLocalSearchParams();
  const [animal, setAnimal] = useState<AnimalDto>();
  const [isLoading, setIsLoading] = useState(true);

  async function fetchAnimal() {
    if (!params) return;
    setIsLoading(true);
    const animalFetched = await ApiService.animals.getById(params.id as string);
    setAnimal(animalFetched);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchAnimal();
  }, [params]);

  console.log(animal);
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
      {isLoading ? (
        <View style={[genericStyles.flexCenter, { height: '100%' }]}>
          <ActivityIndicator animating={isLoading} />
        </View>
      ) : (
        <View style={[genericStyles.flexCenter, { height: '100%' }]}>
          <Text>{animal?.name}</Text>
        </View>
      )}
    </UniversalSafeArea>
  );
};

export default AnimalDetail;
