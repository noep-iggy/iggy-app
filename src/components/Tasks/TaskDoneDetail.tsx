import { TaskDto } from '@/types';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Image } from 'react-native';
import { TaskHeaderDetail } from './TaskHeaderDetail';

interface TaskDoneDetailProps {
  task: TaskDto;
}

export function TaskDoneDetail(props: TaskDoneDetailProps): JSX.Element {
  const { task } = props;
  const theme = useTheme();

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        paddingBottom: 16,
      }}
    >
      <View>
        <Image
          source={{ uri: task.picture?.url }}
          style={{
            width: '100%',
            height: 400,
            borderRadius: 8,
            resizeMode: 'cover',
            borderWidth: 1,
            borderColor: theme.colors.secondary,
          }}
        />
        <TaskHeaderDetail task={task} />
      </View>
    </View>
  );
}
