import { View, Text } from 'react-native';
import React from 'react';
import { AnimalStatusEnum } from '@/types';

interface HappinessIndicatorProps {
  status: AnimalStatusEnum;
}

const HappinessIndicator = (props: HappinessIndicatorProps) => {
  const { status } = props;
  return (
    <View
      style={{
        position: 'absolute',
        top: '10%',
        left: '15%',
        width: 50,
        height: 50,
      }}
    >
      <Text>{status}</Text>
    </View>
  );
};

export default HappinessIndicator;
