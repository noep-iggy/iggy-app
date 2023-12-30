import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const Pets = () => {
  const params = useLocalSearchParams();
  console.log(params);
  return (
    <View>
      <Text>{params.id}</Text>
    </View>
  );
};

export default Pets;
