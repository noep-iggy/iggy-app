import { Avatar, Card, Surface, Text, useTheme } from 'react-native-paper';
import React from 'react';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { ScrollView } from 'react-native-gesture-handler';
import PetCard from '@/components/ParentDashboard/PetCard';
import AddPetCard from '@/components/ParentDashboard/AddPetCard';
import { View } from 'react-native';
import PrimaryButton from '@/components/Buttons/PrimaryButton';

// TODO: call api to get the list of pets
const ParentDashboard = () => {
  const theme = useTheme();
  return (
    <UniversalSafeArea asView>
      <ScrollView>
        <Text
          variant="headlineMedium"
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
        <View style={{ marginHorizontal: 16, marginTop: 32 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
              justifyContent: 'space-between',
            }}
          >
            <Text variant="headlineMedium">Tâches</Text>
            <PrimaryButton title="Ajouter" icon="plus" onPress={() => {}} />
          </View>
          {/* <Card
            mode="contained"
            style={{
              borderRadius: 8,
              padding: 16,
            }}
          >
            <Text variant="bodyMedium">Aucune tâche à afficher</Text>
          </Card> */}
          <Card
            mode="contained"
            style={{
              borderRadius: 8,
              padding: 12,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 8,
              }}
            >
              <Card.Title
                title="Lucas"
                subtitle="pour Pépito"
                style={{ flex: 1, minHeight: 0 }}
                titleStyle={{ fontWeight: 'bold', minHeight: 0 }}
                subtitleStyle={{ fontStyle: 'italic', minHeight: 0 }}
              />
              <Avatar.Image
                size={48}
                source={{
                  uri: 'https://picsum.photos/700',
                }}
                style={{
                  shadowColor: theme.colors.shadow,
                  shadowOffset: { width: 0, height: 5 },
                  shadowOpacity: 0.5,
                  shadowRadius: 6,
                }}
              />
            </View>
            <Card.Content>
              <Text variant="bodyMedium">- Construire l'arbre à chat</Text>
              <Text variant="bodyMedium">- Donner à boire</Text>
              <Text variant="bodyMedium">- Nettoyer la litière</Text>
              <Text variant="bodyMedium">- Vérifier les puces</Text>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </UniversalSafeArea>
  );
};

export default ParentDashboard;
