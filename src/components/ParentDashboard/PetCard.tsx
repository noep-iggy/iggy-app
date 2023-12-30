import { Card } from 'react-native-paper';
import PrimaryButton from '../Buttons/PrimaryButton';
import SecondaryButton from '../Buttons/SecondaryButton';

const PetCard = () => {
  return (
    <Card mode="contained" contentStyle={{ alignItems: 'center', width: 175 }}>
      <Card.Title title="Pépito" titleStyle={{ textAlign: 'center' }} />
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
        <SecondaryButton title="Détails" icon="pen" style={{ width: '100%' }} />
      </Card.Actions>
    </Card>
  );
};

export default PetCard;
