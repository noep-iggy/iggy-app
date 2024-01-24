import { ApiService } from '@/api';
import TaskAnimalCard from '@/components/Card/TaskAnimalCard';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { RefreshScroll } from '@/components/Scroll';
import i18n from '@/locales/localization';
import { ROUTES } from '@/router/routes';
import { TaskDto, TaskStatusEnum } from '@/types';
import { Stack, router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme, SegmentedButtons, Icon, Text } from 'react-native-paper';

const TasksPage = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [page, setPage] = useState<TaskStatusEnum | 'ARCHIVED'>(
    TaskStatusEnum.TODO
  );
  const [pageNumber, setPageNumber] = useState<number>(0);

  async function fetchTasks(newPageNumber = 0) {
    setIsLoading(true);
    setPageNumber(newPageNumber);
    const tasksFetched = await ApiService.tasks.getAll({
      page: newPageNumber,
      pageSize: 10,
      date: page !== 'ARCHIVED' ? 'today' : undefined,
      status: page !== 'ARCHIVED' ? page : undefined,
      isArchived: page === 'ARCHIVED' ? true : undefined,
    });
    setTasks((prevTasks) => [...prevTasks, ...tasksFetched]);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      setTasks([]);
      setPageNumber(0);
      fetchTasks(0);
    }, [page])
  );

  return (
    <UniversalSafeArea asView style={{ paddingHorizontal: 16 }}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push(ROUTES.task.create)}
              style={{
                backgroundColor: theme.colors.primary,
                borderRadius: 50,
                marginHorizontal: 8,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 8,
                paddingVertical: 6,
              }}
            >
              <Icon source="plus" size={20} color="white" />
              <Text
                variant="bodyMedium"
                style={{ color: 'white', marginLeft: 2 }}
              >
                {i18n.t('generics.add')}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <SegmentedButtons
        style={{ paddingVertical: 16 }}
        value={page}
        onValueChange={(value) => {
          setPage(value as TaskStatusEnum | 'ARCHIVED');
        }}
        buttons={[
          {
            value: TaskStatusEnum.TODO,
            label: 'À faire',
          },
          {
            value: TaskStatusEnum.TO_VALIDATE,
            label: 'À valider',
          },
          {
            value: TaskStatusEnum.DONE,
            label: 'Terminé',
          },
          {
            value: 'ARCHIVED',
            label: 'Archivé',
          },
        ]}
      />
      <RefreshScroll
        isEmpty={tasks.length === 0}
        emptyText={i18n.t('tasks.noTasks')}
        isLoading={isLoading}
        onNextPage={() => {
          fetchTasks(pageNumber + 1);
        }}
        onRefresh={() => {
          setTasks([]);
          fetchTasks(0);
        }}
      >
        {tasks.map((task) => (
          <TaskAnimalCard isAnimalVisible key={task.id} task={task} />
        ))}
      </RefreshScroll>
    </UniversalSafeArea>
  );
};

export default TasksPage;
