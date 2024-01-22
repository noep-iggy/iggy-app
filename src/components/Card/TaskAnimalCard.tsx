import { genericStyles } from '@/constants';
import { ROUTES } from '@/router/routes';
import { TaskDto } from '@/types';
import { animalResolver } from '@/utils/animal';
import { router } from 'expo-router';
import { StyleProp, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Icon, Text, useTheme } from 'react-native-paper';
import { TaskStatus } from '../Status/TaskStatus';
import { formatDateTime } from '@/utils';

interface TaskAnimalCardProps {
  task: TaskDto;
  isAnimalVisible?: boolean;
  style?: StyleProp<ViewStyle>;
}

const TaskAnimalCard = (props: TaskAnimalCardProps) => {
  const { task, isAnimalVisible, style } = props;
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        {
          width: '100%',
          borderRadius: 8,
          padding: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 4,
          backgroundColor: theme.colors.surfaceVariant,
          borderWidth: 1,
          borderColor: task.isArchived
            ? theme.colors.error
            : theme.colors.primary,
        },
        style,
      ]}
      onPress={() => {
        router.push(ROUTES.task.detail);
        router.setParams({ id: task?.id ?? '0' });
      }}
    >
      <View style={[genericStyles.flexColumn, { minWidth: '70%' }]}>
        <Text
          variant="bodyLarge"
          style={{ fontWeight: 'bold', marginBottom: 1 }}
        >
          {task.title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
          }}
        >
          <Icon source="account" size={16} />
          <Text variant="bodySmall" style={{ marginLeft: 4 }}>
            {task.users.map((user) => user.firstName).join(', ')}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
          }}
        >
          <Icon source="clock-outline" size={16} />
          <Text variant="bodySmall" style={{ marginLeft: 4 }}>
            {formatDateTime(task.date)}
          </Text>
        </View>
        <TaskStatus taskStatus={task.status} />
      </View>
      <View style={[genericStyles.flexRow, { position: 'relative' }]}>
        {isAnimalVisible &&
          task.animals.map((animal, index) => (
            <Avatar.Image
              key={`image-${task.id}}-${animal.id}`}
              size={40}
              source={animalResolver(animal.type)}
              style={{
                position: 'absolute',
                left: index * -20 - 35, // Ajustez la position horizontale en fonction de l'index
                shadowColor: theme.colors.shadow,
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.5,
                shadowRadius: 6,
                backgroundColor: theme.colors.surfaceVariant,
                borderWidth: 1,
                width: 45,
                height: 45,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
              }}
            />
          ))}
      </View>
    </TouchableOpacity>
  );
};

export default TaskAnimalCard;
