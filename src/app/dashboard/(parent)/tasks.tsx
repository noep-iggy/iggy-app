import { ApiService } from '@/api';
import TaskAnimalCard from '@/components/Card/TaskAnimalCard';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { RefreshScroll } from '@/components/Scroll';
import i18n from '@/locales/localization';
import { TaskDto, TaskStatusEnum } from '@/types';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { useTheme, SegmentedButtons } from 'react-native-paper';

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
    const tasksFetched =
      page === 'ARCHIVED'
        ? await ApiService.tasks.getArchive({
            page: newPageNumber,
            pageSize: 10,
          })
        : await ApiService.tasks.getByStatus(page, {
            page: newPageNumber,
            pageSize: 10,
          });
    setPageNumber(newPageNumber);
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
      <SegmentedButtons
        style={{ paddingVertical: 16 }}
        value={page}
        onValueChange={(value) => {
          setPage(value as TaskStatusEnum | 'ARCHIVED');
        }}
        buttons={[
          {
            value: TaskStatusEnum.TODO,
            label: 'Prévu',
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
