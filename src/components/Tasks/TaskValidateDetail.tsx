import { genericStyles } from '@/constants';
import i18n from '@/locales/localization';
import { TaskDto } from '@/types';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import PrimaryButton from '../Buttons/PrimaryButton';
import { ApiService } from '@/api';
import { useCallback, useState } from 'react';
import { Image } from 'react-native';
import { TaskHeaderDetail } from './TaskHeaderDetail';
import { useFocusEffect, useRouter } from 'expo-router';
import { ROUTES } from '@/router/routes';

interface TaskValidateDetailProps {
  task: TaskDto;
  setTask: (task: TaskDto) => void;
}

export function TaskValidateDetail(
  props: TaskValidateDetailProps
): JSX.Element {
  const { task, setTask } = props;
  const theme = useTheme();
  const [isValidateLoading, setIsValidateLoading] = useState(false);
  const router = useRouter();

  async function validateTask() {
    if (!task) return;
    setIsValidateLoading(true);
    const taskFetched = await ApiService.tasks.validate(task.id);
    setTask(taskFetched);
    setIsValidateLoading(false);
  }

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
            height: 350,
            borderRadius: 8,
            resizeMode: 'cover',
            borderWidth: 1,
            borderColor: theme.colors.secondary,
          }}
        />
        <TaskHeaderDetail task={task} />
      </View>
      <View
        style={[
          genericStyles.flexRow,
          { width: '100%', justifyContent: 'center' },
        ]}
      >
        <PrimaryButton
          style={{
            marginRight: 8,
            backgroundColor: theme.colors.error,
          }}
          onPress={() => {
            router.push(ROUTES.modals.refuseTaskModal);
            router.setParams({ id: task.id });
          }}
          title={i18n.t('tasks.refuse')}
          big
          disabled={isValidateLoading}
        />
        <PrimaryButton
          style={{ marginLeft: 8, width: '60%' }}
          onPress={() => validateTask()}
          title={i18n.t('tasks.validate')}
          big
          loading={isValidateLoading}
          disabled={isValidateLoading}
        />
      </View>
    </View>
  );
}
