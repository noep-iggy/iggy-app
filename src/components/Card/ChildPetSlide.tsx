import { View } from 'react-native';
import { Text } from 'react-native-paper';
import React from 'react';
import { AnimalDto } from '@/types';
import LottieView from 'lottie-react-native';
import { animalAnimationResolver } from '@/utils/animal';

interface ChildPetSlideProps {
  animal: AnimalDto;
  cardWidth: number;
}

const ChildPetSlide = (props: ChildPetSlideProps) => {
  const { animal, cardWidth } = props;
  return (
    <View style={{ width: cardWidth, height: '100%', paddingTop: 70 }}>
      <Text
        variant="headlineLarge"
        style={{
          textAlign: 'center',
          color: 'white',
        }}
      >
        {animal.name}
      </Text>
      <View
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 1,
        }}
      >
        <LottieView
          autoPlay={true}
          source={animalAnimationResolver(animal.type)}
          style={{
            alignSelf: 'center',
            height: 'auto',
          }}
        />
      </View>
    </View>
  );
};

export default ChildPetSlide;
