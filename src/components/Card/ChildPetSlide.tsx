import { Platform, View, Image } from 'react-native';
import { Text } from 'react-native-paper';
import React from 'react';
import { AnimalDto, AnimalTypeEnum } from '@/types';
import LottieView from 'lottie-react-native';
import { animalAnimationResolver, animalResolver } from '@/utils/animal';
import HappinessIndicator from '../Status/HappinessIndicator';

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
        {Platform.OS === 'ios' ? (
          <LottieView
            autoPlay={true}
            source={animalAnimationResolver(animal.type)}
            style={{
              alignSelf: 'center',
              height: 'auto',
            }}
          />
        ) : (
          <Image
            resizeMode="contain"
            style={{ width: 200 }}
            source={animalResolver(animal.type)}
          />
        )}
        <HappinessIndicator status={animal.status} />
      </View>
    </View>
  );
};

export default ChildPetSlide;
