import { View } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { TaskDto } from '@/types';
import { ApiService } from '@/api';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { ActivityIndicator } from 'react-native-paper';
import { TaskTodoDetail } from '@/components/Tasks/TaskTodoDetail';

const TaskDetail = () => {
  const params = useLocalSearchParams();
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

  function renderTask() {
    if (isLoading) return <ActivityIndicator animating={true} />;
    if (!task) return null;
    return <TaskTodoDetail task={task} setTask={setTask} />;
  }

  if (!task) {
    return null;
  }

  return (
    <UniversalSafeArea
      style={{
        paddingHorizontal: 16,
      }}
      asView
    >
      <View style={{ flex: 1, paddingVertical: 16 }}>{renderTask()}</View>
    </UniversalSafeArea>
  );
};

export default TaskDetail;
