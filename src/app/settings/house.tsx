import { ApiService } from '@/api';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { genericStyles } from '@/constants';
import { JoinCodeDto } from '@/types';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { useTheme, Text, Button } from 'react-native-paper';

const HouseSettings = () => {
  const params = useLocalSearchParams();
  const theme = useTheme();
  const router = useRouter();

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
    <UniversalSafeArea
      style={{
        padding: 16,
      }}
      asView
    >
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
    </UniversalSafeArea>
  );
};

export default HouseSettings;
