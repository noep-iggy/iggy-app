import i18n from '@/locales/localization';
import { TaskDto } from '@/types';
import { View } from 'react-native';
import PrimaryButton from '../Buttons/PrimaryButton';
import AddPictureCard from '../Card/AddPictureCard';
import { ApiService } from '@/api';
import { useState } from 'react';
import { TaskHeaderDetail } from './TaskHeaderDetail';
import { genericStyles } from '@/constants';
import SecondaryButton from '../Buttons/SecondaryButton';
import { ROUTES } from '@/router/routes';
import { useRouter } from 'expo-router';

interface TaskTodoDetailProps {
  task: TaskDto;
  setTask: (task: TaskDto) => void;
}

export function TaskTodoDetail(props: TaskTodoDetailProps): JSX.Element {
  const { task, setTask } = props;
  const [newPictureUri, setNewPictureUri] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function checkTask() {
    if (!task || !newPictureUri) return;
    setIsLoading(true);
    const createPicture = await ApiService.media.fileUpload(newPictureUri);
    if (!createPicture) return;
    const taskFetched = await ApiService.tasks.check(task.id, {
      pictureId: createPicture.id,
    });
    setTask(taskFetched);
    setIsLoading(false);
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
        <AddPictureCard
          pictureUri={newPictureUri}
          setPictureUri={setNewPictureUri}
        />
        <TaskHeaderDetail task={task} />
      </View>
      <View
        style={[
          genericStyles.flexRow,
          { width: '100%', justifyContent: 'center', gap: 8 },
        ]}
      >
        <SecondaryButton
          onPress={() => {
            router.push(ROUTES.task.update);
            router.setParams({ id: task.id });
          }}
          title={i18n.t('generics.edit')}
          big
          icon="pencil"
        />
        <PrimaryButton
          disabled={!newPictureUri || isLoading}
          loading={isLoading}
          onPress={() => checkTask()}
          title={i18n.t('tasks.check')}
          big
        />
      </View>
    </View>
  );
}
