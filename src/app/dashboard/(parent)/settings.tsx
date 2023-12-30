import { View, Text } from 'react-native';
import { useAuthContext } from '@/contexts';
import { Button } from 'react-native-paper';

const Settings = () => {
  const { currentUser, removeToken } = useAuthContext();

  return (
    <View>
      <Text>Settings</Text>
      {currentUser && (
        <Button
          mode="outlined"
          style={{ backgroundColor: 'white' }}
          onPress={() => removeToken()}
        >
          {'Logout'}
        </Button>
      )}
    </View>
  );
};

export default Settings;
