import { View, Text } from 'react-native';
import React from 'react';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { ScrollView } from 'react-native-gesture-handler';

const ParentDashboard = () => {
  return (
    <UniversalSafeArea asView>
      <ScrollView>
        <Text>Accueil</Text>
      </ScrollView>
    </UniversalSafeArea>
  );
};

export default ParentDashboard;
