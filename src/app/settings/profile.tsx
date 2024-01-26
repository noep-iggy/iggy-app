import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { useAuthContext } from '@/contexts';
import { useLocalSearchParams } from 'expo-router';
import { useTheme, Button } from 'react-native-paper';

const ProfileSettings = () => {
  const { currentUser, removeToken } = useAuthContext();

  const params = useLocalSearchParams();
  const theme = useTheme();

  return (
    <UniversalSafeArea
      style={{
        padding: 16,
      }}
      asView
    >
      {currentUser && (
        <Button
          mode="outlined"
          style={{ backgroundColor: 'white' }}
          onPress={() => removeToken()}
        >
          {'Logout'}
        </Button>
      )}
    </UniversalSafeArea>
  );
};

export default ProfileSettings;
