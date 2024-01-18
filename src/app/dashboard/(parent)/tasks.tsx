import { ApiService } from '@/api';
import TaskAnimalCard from '@/components/Card/TaskAnimalCard';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { RefreshScroll } from '@/components/Scroll';
import i18n from '@/locales/localization';
import { TaskDto } from '@/types';
import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useTheme, Text, SegmentedButtons } from 'react-native-paper';

enum PageEnum {
  IN_PROGRESS = 'inProgress',
  ARCHIVED = 'archived',
}

const TasksPage = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [page, setPage] = useState(PageEnum.IN_PROGRESS);

  async function fetchTasks() {
    setIsLoading(true);
    const tasksFetched =
      page === PageEnum.IN_PROGRESS
        ? await ApiService.tasks.getAll()
        : await ApiService.tasks.getArchive();
    setTasks(tasksFetched);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchTasks();
  }, [page]);

  return (
    <UniversalSafeArea asView>
      <SegmentedButtons
        style={{ marginHorizontal: 16, marginTop: 16 }}
        value={page}
        onValueChange={(value) => setPage(value as PageEnum)}
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
      <RefreshScroll isLoading={isLoading} fetchDatas={() => fetchTasks()}>
        <View style={{ marginHorizontal: 16, marginTop: 16 }}>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskAnimalCard
                isAnimalVisible
                key={task.id}
                task={task}
                style={{
                  borderWidth: 1,
                  borderColor:
                    page === PageEnum.ARCHIVED
                      ? theme.colors.error
                      : theme.colors.surfaceVariant,
                }}
              />
            ))
          ) : (
            <Text
              variant="bodyMedium"
              style={{ textAlign: 'left', width: '100%', marginBottom: 15 }}
            >
              {i18n.t('tasks.noTasks')}
            </Text>
          )}
        </View>
      </RefreshScroll>
    </UniversalSafeArea>
  );
};

export default TasksPage;
