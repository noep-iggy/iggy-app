import { View, ActivityIndicator, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { TaskDto, TaskStatusEnum } from '@/types';
import { ApiService } from '@/api';
import { genericStyles } from '@/constants';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import i18n from '@/locales/localization';
import { Text, useTheme } from 'react-native-paper';
import AddPictureCard from '@/components/Card/AddPictureCard';

const TaskDetail = () => {
  const params = useLocalSearchParams();
  const theme = useTheme();
  const [task, setTask] = useState<TaskDto>();
  const [isLoading, setIsLoading] = useState(true);
  const [newPictureUri, setNewPictureUri] = useState<string>();

  async function fetchTask() {
    if (!params) return;
    setIsLoading(true);
    const taskFetched = await ApiService.tasks.getById(params.id as string);
    setTask(taskFetched);
    setIsLoading(false);
  }

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

  async function validateTask() {
    if (!task) return;
    setIsLoading(true);
    const taskFetched = await ApiService.tasks.validate(task.id);
    setTask(taskFetched);
    setIsLoading(false);
  }

  async function refuseTask() {
    if (!task) return;
    setIsLoading(true);
    const taskFetched = await ApiService.tasks.refuse(task.id, {
      message: 'Refused',
    });
    setTask(taskFetched);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchTask();
  }, []);

  function taskRender(status: TaskStatusEnum) {
    switch (status) {
      case TaskStatusEnum.TODO:
        return (
          <View style={{ width: '100%' }}>
            <AddPictureCard
              pictureUri={newPictureUri}
              setPictureUri={setNewPictureUri}
            />
            <PrimaryButton
              disabled={!newPictureUri || isLoading}
              loading={isLoading}
              onPress={() => checkTask()}
              title={i18n.t('tasks.check')}
              big
            />
          </View>
        );
      case TaskStatusEnum.TO_VALIDATE:
        if (!task?.picture) return null;
        return (
          <View style={{ width: '100%' }}>
            <Image
              source={{ uri: task.picture.url }}
              style={{
                width: '100%',
                height: 500,
                borderRadius: 8,
                resizeMode: 'cover',
              }}
            />
            <View style={[genericStyles.flexRow, { width: '100%' }]}>
              <PrimaryButton
                style={{ marginRight: 8, backgroundColor: theme.colors.error }}
                onPress={() => refuseTask()}
                title={i18n.t('tasks.refuse')}
                big
              />
              <PrimaryButton
                style={{ marginLeft: 8 }}
                onPress={() => validateTask()}
                title={i18n.t('tasks.validate')}
                big
              />
            </View>
          </View>
        );
      case TaskStatusEnum.DONE:
        if (!task?.picture) return null;
        return (
          <View style={{ width: '100%' }}>
            <Image
              source={{ uri: task.picture.url }}
              style={{
                width: '100%',
                height: 500,
                borderRadius: 8,
                resizeMode: 'cover',
              }}
            />
          </View>
        );
    }
  }

  if (!task) {
    return null;
  }

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
      <Stack.Screen
        options={{
          headerTitle: task?.title,
        }}
      />
      {isLoading ? (
        <View style={[genericStyles.flexCenter, { height: '100%' }]}>
          <ActivityIndicator animating={isLoading} />
        </View>
      ) : (
        <View
          style={[
            genericStyles.flexCenter,
            {
              justifyContent: 'flex-start',
              height: '100%',
              width: '100%',
            },
          ]}
        >
          {taskRender(task.status)}
          <Text variant="bodyMedium">{task.description}</Text>
        </View>
      )}
    </UniversalSafeArea>
  );
};

export default TaskDetail;
