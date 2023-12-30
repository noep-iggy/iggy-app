import { Stack } from 'expo-router';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

const AnimalCreate = () => {
  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: true,
        }}
      />
      <Text>AnimalsAdd</Text>
    </View>
  );
};

export default AnimalCreate;
