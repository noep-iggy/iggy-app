import { View, Text, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { AnimalDto } from '@/types';
import { ApiService } from '@/api';
import { genericStyles } from '@/constants';

const Pets = () => {
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
    <View style={[genericStyles.flexCenter, { height: '100%' }]}>
      {animals.map((animal) => (
        <Text key={animal.id}>{animal.name}</Text>
      ))}
    </View>
  );
};

export default Pets;
