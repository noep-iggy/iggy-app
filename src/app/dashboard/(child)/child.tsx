import { useAuthContext } from '@/contexts';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

const ChildDashboard = () => {
  const { removeToken } = useAuthContext();

  return (
    <View>
      <Text>ChildDashboard</Text>
      <Button
        mode="outlined"
        style={{ backgroundColor: 'white' }}
        onPress={() => removeToken()}
      >
        {'Logout'}
      </Button>
    </View>
  );
};

export default ChildDashboard;
