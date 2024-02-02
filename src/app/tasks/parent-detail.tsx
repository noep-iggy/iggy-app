import { ActivityIndicator } from 'react-native';
import { useState, useCallback } from 'react';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { TaskDto, TaskStatusEnum } from '@/types';
import { ApiService } from '@/api';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { useTheme } from 'react-native-paper';
import { TaskTodoDetail } from '@/components/Tasks/TaskTodoDetail';
import { TaskValidateDetail } from '@/components/Tasks/TaskValidateDetail';
import { TaskDoneDetail } from '@/components/Tasks/TaskDoneDetail';
import i18n from '@/locales/localization';
import Toast from 'react-native-toast-message';
import { ROUTES } from '@/router/routes';
import { DeleteDialog } from '@/components/Dialog/DeleteDialog';
import { ButtonsAction } from '@/components/Actions/ButtonsAction';

const TaskDetail = () => {
  const params = useLocalSearchParams();
  const theme = useTheme();
  const [task, setTask] = useState<TaskDto>();
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

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

  return (
    <>
      <UniversalSafeArea
        style={{
          padding: 16,
        }}
        asView
      >
        {taskRender(task.status)}
      </UniversalSafeArea>
      <DeleteDialog
        visible={isConfirmVisible}
        onConfirm={() => {
          setIsConfirmVisible(false);
          removeTask();
        }}
        onCancel={() => setIsConfirmVisible(false)}
        title={i18n.t('tasks.confirmDelete.title')}
        content={i18n.t('tasks.confirmDelete.subtitle')}
      />
      <ButtonsAction
        icon="cog"
        style={{
          paddingBottom: 100,
        }}
        items={
          task.status === TaskStatusEnum.TODO
            ? [
                {
                  icon: 'pencil',
                  label: i18n.t('generics.update'),
                  onPress: () => {
                    router.push(ROUTES.task.update);
                    router.setParams({ id: params.id as string });
                  },
                },
                {
                  icon: 'trash-can',
                  label: i18n.t('generics.delete'),
                  onPress: () => {
                    setIsConfirmVisible(true);
                  },
                },
              ]
            : [
                {
                  icon: 'trash-can',
                  label: i18n.t('generics.delete'),
                  onPress: () => {
                    setIsConfirmVisible(true);
                  },
                },
              ]
        }
      />
    </>
  );
};

export default TaskDetail;
