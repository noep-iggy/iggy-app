import { View } from 'react-native';
import { useAuthContext } from '@/contexts';
import { Button, Text } from 'react-native-paper';
import { JoinCodeDto } from '@/types';
import { useState } from 'react';
import { ApiService } from '@/api';
import { genericStyles } from '@/constants';

const Settings = () => {
  const { currentUser, removeToken } = useAuthContext();
  const [code, setCode] = useState<JoinCodeDto>();

  async function createJoinCodeParent() {
    const joinCode = await ApiService.joinCode.create.parent();
    setCode(joinCode);
  }

  async function createJoinCodeChild() {
    const joinCode = await ApiService.joinCode.create.child();
    setCode(joinCode);
  }

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
      <View
        style={[
          genericStyles.colCenter,
          {
            marginTop: 20,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            padding: 20,
          },
        ]}
      >
        <Text variant="headlineMedium">{'Create Join Code'}</Text>
        <Text variant="headlineSmall" style={{ marginTop: 10 }}>
          {code?.code}
        </Text>
        <View style={[genericStyles.flexRow, { marginTop: 20, gap: 5 }]}>
          <Button
            mode="outlined"
            style={{ backgroundColor: 'white' }}
            onPress={createJoinCodeParent}
          >
            {'Parent'}
          </Button>
          <Button
            mode="outlined"
            style={{ backgroundColor: 'white' }}
            onPress={createJoinCodeChild}
          >
            {'Child'}
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Settings;
