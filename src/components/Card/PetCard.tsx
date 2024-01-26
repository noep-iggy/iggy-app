import { Card, Text } from 'react-native-paper';
import { AnimalTypeEnum, BasicAnimalDto } from '@/types';
import { router } from 'expo-router';
import { ROUTES } from '@/router/routes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import { animalAnimationResolver } from '@/utils/animal';
export interface PetCardProps {
  animal?: BasicAnimalDto;
}

const PetCard = ({ animal }: PetCardProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(ROUTES.animal.detail);
        router.setParams({ id: animal?.id ?? '0' });
      }}
    >
      <Card
        mode="contained"
        contentStyle={{ alignItems: 'center', width: 175 }}
      >
        <Text
          variant="headlineSmall"
          style={{ textAlign: 'center', marginTop: 5 }}
        >
          {animal?.name ?? 'Animal'}
        </Text>
        <LottieView
          autoPlay={true}
          source={animalAnimationResolver(animal?.type ?? AnimalTypeEnum.DOG)}
          style={{ width: 150, height: 150 }}
        />
      </Card>
    </TouchableOpacity>
  );
};

export default PetCard;
