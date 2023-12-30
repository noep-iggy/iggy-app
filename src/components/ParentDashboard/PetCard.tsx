import { Card } from 'react-native-paper';
import SecondaryButton from '../Buttons/SecondaryButton';
import { BasicAnimalDto } from '@/types';
import { router } from 'expo-router';
import { ROUTES } from '@/router/routes';

export interface PetCardProps {
  animal?: BasicAnimalDto;
}

const PetCard = ({ animal }: PetCardProps) => {
  return (
    <Card mode="contained" contentStyle={{ alignItems: 'center', width: 175 }}>
      <Card.Title
        title={animal?.name ?? 'Animal'}
        titleStyle={{ textAlign: 'center' }}
      />
      <Card.Cover
        source={require('@/assets/images/dog.png')}
        style={{
          width: 175,
          height: 120,
          backgroundColor: 'transparent',
          backgroundPosition: 'top',
          marginBottom: 10,
        }}
        resizeMode="contain"
      />
      <Card.Actions style={{ paddingHorizontal: 8 }}>
        <SecondaryButton
          title="Détails"
          icon="pen"
          style={{ width: '100%' }}
          onPress={() => {
            router.replace(ROUTES.animal.details);
            router.setParams({ id: animal?.id ?? '0' });
          }}
        />
      </Card.Actions>
    </Card>
  );
};

export default PetCard;
