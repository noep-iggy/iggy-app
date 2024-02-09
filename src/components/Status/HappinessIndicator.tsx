import { View, Text } from 'react-native';
import React from 'react';
import { AnimalStatusEnum } from '@/types';

interface HappinessIndicatorProps {
  status: AnimalStatusEnum;
}

const HappinessIndicator = (props: HappinessIndicatorProps) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: '10%',
        left: '15%',
        backgroundColor: 'red',
        width: 50,
        height: 50,
      }}
    >
      <Text>HappinessIndicator</Text>
    </View>
  );
};

export default HappinessIndicator;
