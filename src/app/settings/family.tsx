import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { useLocalSearchParams } from 'expo-router';
import { useTheme, Text } from 'react-native-paper';

const FamilySettings = () => {
  const params = useLocalSearchParams();
  const theme = useTheme();

  return (
    <UniversalSafeArea
      style={{
        padding: 16,
      }}
      asView
    >
      <Text>Profile</Text>
    </UniversalSafeArea>
  );
};

export default FamilySettings;
