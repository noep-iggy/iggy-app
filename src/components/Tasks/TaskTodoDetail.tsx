import i18n from '@/locales/localization';
import { TaskDto, TaskStatusEnum } from '@/types';
import { View } from 'react-native';
import PrimaryButton from '../Buttons/PrimaryButton';
import { ApiService } from '@/api';
import { useState } from 'react';
import { TaskHeaderDetail } from './TaskHeaderDetail';
import { useRouter } from 'expo-router';
import { useAuthContext } from '@/contexts';
import Toast from 'react-native-toast-message';
import { animalAnimationResolver } from '@/utils/animal';
import LottieView from 'lottie-react-native';
import AddPictureCard from '../Card/AddPictureCard';
import { genericStyles } from '@/constants';
import { ViewProps } from '@expo/html-elements/build/primitives/View';

interface TaskTodoDetailProps {
  task: TaskDto;
  setTask: (task: TaskDto) => void;
  isChild?: boolean;
  style?: ViewProps['style'];
}

export function TaskTodoDetail(props: TaskTodoDetailProps): JSX.Element {
  const { task, setTask, isChild = true, style } = props;
  const [newPictureUri, setNewPictureUri] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { currentUser } = useAuthContext();

  async function checkTask() {
    if (!task || !newPictureUri) return;
    setIsLoading(true);
    const createPicture = await ApiService.media.fileUpload(newPictureUri);
    if (!createPicture) return;
    const taskFetched = await ApiService.tasks.check(task.id, {
      pictureId: createPicture.id,
    });
    setTask(taskFetched);
    if (
      taskFetched.status === TaskStatusEnum.TO_VALIDATE &&
      currentUser?.role === 'CHILD'
    ) {
      Toast.show({
        type: 'success',
        text1: i18n.t('generics.yay'),
        text2: i18n.t('tasks.wentToValidation'),
      });
      router.back();
    }
    setIsLoading(false);
  }

  return (
    <View
      style={[
        {
          width: '100%',
          height: '100%',
          justifyContent: 'space-between',
          paddingBottom: 16,
        },
        style,
      ]}
    >
      <View>
        {newPictureUri || isChild ? (
          <AddPictureCard
            pictureUri={newPictureUri}
            setPictureUri={setNewPictureUri}
          />
        ) : (
          <LottieView
            autoPlay={true}
            source={animalAnimationResolver(task.animals[0].type)}
            style={{
              height: 300,
            }}
          />
        )}

        <TaskHeaderDetail task={task} />
      </View>
      <View style={[genericStyles.flexRow, {}]}>
        {!newPictureUri && !isChild && (
          <AddPictureCard
            size="small"
            style={{ height: 50, width: 80, borderRadius: 20 }}
            setPictureUri={setNewPictureUri}
          />
        )}

        <PrimaryButton
          style={{ flex: 1, marginLeft: 8 }}
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
