import { Card, Text, TouchableRipple } from 'react-native-paper';
import { AnimalTypeEnum, BasicAnimalDto } from '@/types';
import { router } from 'expo-router';
import { ROUTES } from '@/router/routes';
import LottieView from 'lottie-react-native';
import { animalAnimationResolver, animalResolver } from '@/utils/animal';
import { Platform, Image } from 'react-native';
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
        {Platform.OS === 'ios' ? (
          <LottieView
            autoPlay={true}
            source={animalAnimationResolver(animal?.type ?? AnimalTypeEnum.DOG)}
            style={{ width: 150, height: 150 }}
          />
        ) : (
          <Image
            style={{ width: 150, height: 150 }}
            resizeMode='contain'
            source={animalResolver(animal?.type ?? AnimalTypeEnum.DOG)}
          />
        )}
      </Card>
    </TouchableRipple>
  );
};

export default PetCard;
