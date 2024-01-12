import { View } from 'react-native';
import { genericStyles } from '@/constants';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';

const TaskCreate = () => {
  return (
    <UniversalSafeArea
      style={[
        {
          justifyContent: 'space-between',
          padding: 16,
        },
      ]}
      asView
    >
      <View
        style={[genericStyles.colCenter, { marginTop: 30, width: '100%' }]}
      ></View>
    </UniversalSafeArea>
  );
};

export default TaskCreate;
