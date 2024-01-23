import { ActivityIndicator } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { TaskDto, TaskStatusEnum } from '@/types';
import { ApiService } from '@/api';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { useTheme } from 'react-native-paper';
import { TaskTodoDetail } from '@/components/Tasks/TaskTodoDetail';
import { TaskValidateDetail } from '@/components/Tasks/TaskValidateDetail';
import { TaskDoneDetail } from '@/components/Tasks/TaskDoneDetail';

const TaskDetail = () => {
  const params = useLocalSearchParams();
  const theme = useTheme();
  const [task, setTask] = useState<TaskDto>();
  const [isLoading, setIsLoading] = useState(true);

  async function fetchTask() {
    if (!params) return;
    setIsLoading(true);
    const taskFetched = await ApiService.tasks.getById(params.id as string);
    setTask(taskFetched);
    setIsLoading(false);
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
    <UniversalSafeArea
      style={{
        padding: 16,
      }}
      asView
    >
      {taskRender(task.status)}
    </UniversalSafeArea>
  );
};

export default TaskDetail;
