import { View, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { TaskDto } from '@/types';
import { ApiService } from '@/api';
import { genericStyles } from '@/constants';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';

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

  useEffect(() => {
    fetchTask();
  }, []);

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
        ></View>
      )}
    </UniversalSafeArea>
  );
};

export default TaskDetail;
