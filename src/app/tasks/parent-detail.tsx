import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { useState, useCallback } from 'react';
import {
  Stack,
  router,
  useFocusEffect,
  useLocalSearchParams,
} from 'expo-router';
import { TaskDto, TaskStatusEnum } from '@/types';
import { ApiService } from '@/api';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { Icon, useTheme } from 'react-native-paper';
import { TaskTodoDetail } from '@/components/Tasks/TaskTodoDetail';
import { TaskValidateDetail } from '@/components/Tasks/TaskValidateDetail';
import { TaskDoneDetail } from '@/components/Tasks/TaskDoneDetail';
import i18n from '@/locales/localization';
import Toast from 'react-native-toast-message';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { ROUTES } from '@/router/routes';

const TaskDetail = () => {
  const params = useLocalSearchParams();
  const theme = useTheme();
  const { showActionSheetWithOptions } = useActionSheet();
  const [task, setTask] = useState<TaskDto>();
  const [isLoading, setIsLoading] = useState(true);

  async function fetchTask() {
    if (!params) return;
    setIsLoading(true);
    const taskFetched = await ApiService.tasks.getById(params.id as string);
    setTask(taskFetched);
    setIsLoading(false);
  }

  async function removeTask() {
    try {
      if (!task) return;
      setIsLoading(true);
      await ApiService.tasks.deleteById(task.id);
      router.back();
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: i18n.t('success.api.task.delete'),
      });
    } catch (e: any) {
      e?.data?.message &&
        Toast.show({
          type: 'error',
          text1: i18n.t('errors.api.title'),
          text2: i18n.t(`errors.${e?.data?.message}`),
        });
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchTask();
    }, [])
  );

  function taskRender(status: TaskStatusEnum) {
    if (isLoading) return <ActivityIndicator animating={true} />;
    if (!task) return null;
    switch (status) {
      case TaskStatusEnum.TODO:
        return <TaskTodoDetail task={task} setTask={setTask} />;
      case TaskStatusEnum.TO_VALIDATE:
        return <TaskValidateDetail task={task} setTask={setTask} />;
      case TaskStatusEnum.DONE:
        return <TaskDoneDetail task={task} />;
    }
  }

  if (!task) {
    return null;
  }

  const onPress = () => {
    const options = [
      i18n.t('generics.update'),
      i18n.t('generics.delete'),
      i18n.t('generics.cancel'),
    ];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;
    const disabledButtonIndices =
      task.status !== TaskStatusEnum.TODO ? [0] : [];

    showActionSheetWithOptions(
      {
        userInterfaceStyle: theme.dark ? 'dark' : 'light',
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        disabledButtonIndices,
        tintIcons: true,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            router.push(ROUTES.task.update);
            router.setParams({ id: params.id as string });
            break;
          case destructiveButtonIndex:
            removeTask();
            break;
          case cancelButtonIndex:
        }
      }
    );
  };

  return (
    <UniversalSafeArea
      style={{
        padding: 16,
      }}
      asView
    >
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={onPress}>
              <Icon size={25} source="dots-vertical" />
            </TouchableOpacity>
          ),
        }}
      />

      {taskRender(task.status)}
    </UniversalSafeArea>
  );
};

export default TaskDetail;
