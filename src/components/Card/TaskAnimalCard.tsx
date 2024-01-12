import { ROUTES } from '@/router/routes';
import { TaskDto } from '@/types';
import { router } from 'expo-router';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon, Text, useTheme } from 'react-native-paper';

interface TaskAnimalCardProps {
  task: TaskDto;
}

const TaskAnimalCard = (props: TaskAnimalCardProps) => {
  const { task } = props;
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={{
        width: '100%',
        borderRadius: 8,
        padding: 16,
        justifyContent: 'center',
        marginBottom: 4,
        backgroundColor: theme.colors.surfaceVariant,
      }}
      onPress={() => {
        router.push(ROUTES.animal.create);
      }}
    >
      <Text variant="bodyLarge" style={{ fontWeight: 'bold', marginBottom: 1 }}>
        {task.title}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon source="account" size={16} />
        {task.users.map((user) => (
          <Text key={user.id} variant="bodySmall" style={{ marginLeft: 4 }}>
            {user.firstName}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default TaskAnimalCard;
