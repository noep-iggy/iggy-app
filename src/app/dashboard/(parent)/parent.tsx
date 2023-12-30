import { Text } from 'react-native-paper';
import React from 'react';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { ScrollView } from 'react-native-gesture-handler';
import PetCard from '@/components/ParentDashboard/PetCard';
import AddPetCard from '@/components/ParentDashboard/AddPetCard';

// TODO: call api to get the list of pets
const ParentDashboard = () => {
  return (
    <UniversalSafeArea asView>
      <ScrollView>
        <Text
          variant="headlineLarge"
          style={{ marginHorizontal: 16, marginVertical: 16 }}
        >
          Animaux
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
        >
          <PetCard />
          <AddPetCard />
        </ScrollView>
      </ScrollView>
    </UniversalSafeArea>
  );
};

export default ParentDashboard;
