import { genericStyles } from '@/constants';
import { ROUTES } from '@/router/routes';
import { TaskDto, TaskPeriodEnum, TaskStatusEnum } from '@/types';
import { animalResolver } from '@/utils/animal';
import { router } from 'expo-router';
import { StyleProp, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Chip, Icon, Text } from 'react-native-paper';
import { TaskStatus } from '../Status/TaskStatus';
import { formatDateTime } from '@/utils';
import { useAppTheme } from '@/app/_layout';

interface TaskAnimalCardProps {
  task: TaskDto;
  isAnimalVisible?: boolean;
  style?: StyleProp<ViewStyle>;
}

const TaskAnimalCard = (props: TaskAnimalCardProps) => {
  const { task, isAnimalVisible, style } = props;
  const theme = useAppTheme();

  return (
    <TouchableOpacity
      style={[
        {
          width: '100%',
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 14,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 4,
          backgroundColor: theme.colors.surfaceVariant,
        },
        style,
      ]}
      onPress={() => {
        router.push(ROUTES.task.parentDetail);
        router.setParams({ id: task?.id ?? '0' });
      }}
    >
      <View
        style={[
          genericStyles.flexColumn,
          { minWidth: '70%', alignItems: 'flex-start' },
        ]}
      >
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
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <TaskStatus taskStatus={task.status} />
          {task.recurrence && (
            <Icon
              source="calendar"
              size={18}
              color={theme.colors.onSurfaceVariant}
            />
          )}
          {task.isArchived && task.status !== TaskStatusEnum.DONE && (
            <Icon source="clock" size={18} color={theme.colors.warning}></Icon>
          )}
        </View>
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
                left: index * -15 - 40,
                backgroundColor: theme.colors.surfaceVariant,
                borderWidth: 2,
                borderColor: theme.colors.secondary,
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
