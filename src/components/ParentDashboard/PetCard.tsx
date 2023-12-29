import { Card } from 'react-native-paper';
import PrimaryButton from '../Buttons/PrimaryButton';

const PetCard = () => {
  return (
    <Card mode="contained" contentStyle={{ alignItems: 'center', width: 200 }}>
      <Card.Title title="Pépito" titleStyle={{ textAlign: 'center' }} />
      <Card.Cover
        source={require('@/assets/images/dog.png')}
        style={{
          width: 150,
          height: 150,
          backgroundColor: 'transparent',
        }}
        resizeMode="contain"
      />
      <Card.Actions style={{ paddingLeft: 0 }}>
        <PrimaryButton title="Détails" icon="pen" />
      </Card.Actions>
    </Card>
  );
};

export default PetCard;
