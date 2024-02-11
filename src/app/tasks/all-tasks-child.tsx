import { View, Text, Task } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { RefreshScroll } from '@/components/Scroll';
import { TaskDto, TaskPeriodEnum, TaskStatusEnum } from '@/types';
import ChildTaskCard from '@/components/Card/ChildTaskCard';
import { ApiService } from '@/api';
import { useAuthContext } from '@/contexts';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';

const AllTasksChild = () => {
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useAuthContext();
  const params = useLocalSearchParams();

  async function fetchTasks() {
    setIsLoading(true);
    const tasksFetched = await ApiService.tasks.getAll({
      status: TaskStatusEnum.TODO,
      date: TaskPeriodEnum.TODAY,
      animalId: params.animalId as string,
      userId: currentUser?.id,
      orderBy: 'date',
      orderType: 'ASC',
    });
    setTasks(tasksFetched);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  return (
    <UniversalSafeArea asView>
      <RefreshScroll
        isEmpty={tasks.length === 0}
        isLoading={isLoading}
        onRefresh={() => {
          fetchTasks();
        }}
      >
        <View style={{ padding: 16, gap: 8 }}>
          {tasks.map((task) => (
            <ChildTaskCard key={task.id} task={task} />
          ))}
        </View>
      </RefreshScroll>
    </UniversalSafeArea>
  );
};

export default AllTasksChild;
