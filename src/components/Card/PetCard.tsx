import { Card, Text, TouchableRipple } from 'react-native-paper';
import { AnimalTypeEnum, BasicAnimalDto } from '@/types';
import { router } from 'expo-router';
import { ROUTES } from '@/router/routes';
import LottieView from 'lottie-react-native';
import { animalAnimationResolver } from '@/utils/animal';
export interface PetCardProps {
  animal?: BasicAnimalDto;
}

const PetCard = ({ animal }: PetCardProps) => {
  return (
    <TouchableRipple
      onPress={() => {
        router.push(ROUTES.animal.detail);
        router.setParams({ id: animal?.id ?? '0' });
      }}
    >
      <Card
        mode="contained"
        contentStyle={{ alignItems: 'center', width: 160, paddingVertical: 12 }}
      >
        <Text
          variant="titleMedium"
          style={{ textAlign: 'center', paddingHorizontal: 12 }}
          numberOfLines={1}
        >
          {animal?.name ?? 'Animal'}
        </Text>
        <LottieView
          autoPlay={true}
          source={animalAnimationResolver(animal?.type ?? AnimalTypeEnum.DOG)}
          style={{ width: 150, height: 150 }}
        />
      </Card>
    </TouchableRipple>
  );
};

export default PetCard;
