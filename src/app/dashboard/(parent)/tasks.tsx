import { ApiService } from '@/api';
import TaskAnimalCard from '@/components/Card/TaskAnimalCard';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { RefreshScroll } from '@/components/Scroll';
import i18n from '@/locales/localization';
import { TaskDto } from '@/types';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { useTheme, SegmentedButtons } from 'react-native-paper';

enum PageEnum {
  IN_PROGRESS = 'IN_PROGRESS',
  ARCHIVED = 'ARCHIVED',
}

const TasksPage = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [page, setPage] = useState(PageEnum.IN_PROGRESS);
  const [pageNumber, setPageNumber] = useState<number>(0);

  async function fetchTasks() {
    setIsLoading(true);
    const tasksFetched =
      page === PageEnum.IN_PROGRESS
        ? await ApiService.tasks.getAll({ page: pageNumber, pageSize: 5 })
        : await ApiService.tasks.getArchive({ page: pageNumber, pageSize: 5 });

    setTasks((existingTasks) => [...existingTasks, ...tasksFetched]);
    setIsLoading(false);
  }

  function refreshTasks() {
    setTasks([]);
    setPageNumber(0);
    fetchTasks();
  }

  useFocusEffect(
    useCallback(() => {
      refreshTasks();
    }, [page])
  );

  return (
    <UniversalSafeArea asView style={{ paddingHorizontal: 16 }}>
      <SegmentedButtons
        style={{ paddingVertical: 16 }}
        value={page}
        onValueChange={(value) => {
          setPage(value as PageEnum);
        }}
        buttons={[
          {
            value: PageEnum.IN_PROGRESS,
            label: 'Prévu',
          },
          {
            value: PageEnum.ARCHIVED,
            label: 'Archivé',
          },
        ]}
      />
      <RefreshScroll
        isEmpty={tasks.length === 0}
        emptyText={i18n.t('tasks.noTasks')}
        isLoading={isLoading}
        onNextPage={() => {
          setPageNumber(pageNumber + 1);
          fetchTasks();
        }}
        onRefresh={() => {
          refreshTasks();
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
