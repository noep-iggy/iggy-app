import { genericStyles } from '@/constants';
import { TaskDto } from '@/types';
import { formatDateTime } from '@/utils';
import { renderTaskColor } from '@/utils/task';
import { ScrollView, View } from 'react-native';
import { Icon } from 'react-native-paper';
import { TaskStatus } from '../Status/TaskStatus';
import { Text } from 'react-native-paper';
import i18n from '@/locales/localization';
import { useAppTheme } from '@/app/_layout';

interface TaskHeaderDetailProps {
  task: TaskDto;
}

export function TaskHeaderDetail(props: TaskHeaderDetailProps): JSX.Element {
  const { task } = props;
  const theme = useAppTheme();

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ height: '38%' }}>
      <Text
        variant="headlineSmall"
        style={{ fontWeight: 'bold', marginTop: 5, marginBottom: 10 }}
      >
        {task.title}
      </Text>
      <View style={[genericStyles.flexRow, { width: '100%', marginBottom: 2 }]}>
        <Icon
          source="calendar"
          size={24}
          color={renderTaskColor(task.status, theme)}
        />
        <Text
          variant="bodyMedium"
          style={{
            marginLeft: 5,
            color: renderTaskColor(task.status, theme),
          }}
        >
          {formatDateTime(task.date)}
        </Text>
        <TaskStatus style={{ marginLeft: 15 }} taskStatus={task.status} />
      </View>
      <View style={[genericStyles.flexRow, { width: '100%', marginBottom: 2 }]}>
        <Icon source="account" size={24} />
        <Text variant="bodyMedium" style={{ marginLeft: 4, marginRight: 10 }}>
          {task.users.map((user) => user.firstName).join(', ')}
        </Text>
        <Icon source="arrow-right" size={20} />
        <Text variant="bodyMedium" style={{ marginLeft: 10 }}>
          {task.animals.map((animal) => animal.name).join(', ')}
        </Text>
      </View>
      <View
        style={[genericStyles.flexRow, { width: '100%', marginBottom: 15 }]}
      >
        <Icon source="clock-time-eight" size={24} />
        <Text variant="bodyMedium" style={{ marginLeft: 4 }}>
          {i18n.t(`enums.recurrence.type.${task.recurrence?.type ?? 'NULL'}`)}
        </Text>
      </View>
      {task.message && (
        <View
          style={[genericStyles.flexRow, { width: '100%', marginBottom: 15 }]}
        >
          <Icon source="chat-alert" size={24} color={theme.colors.error} />
          <Text
            variant="bodyMedium"
            style={{
              marginLeft: 4,
              marginRight: 10,
              color: theme.colors.error,
            }}
          >
            {task.message}
          </Text>
        </View>
      )}
      <Text variant="bodyLarge">{task.description}</Text>
    </ScrollView>
  );
}
