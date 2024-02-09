import { ApiService } from '@/api';
import { useAppTheme } from '@/app/_layout';
import { ButtonsAction } from '@/components/Actions/ButtonsAction';
import TaskAnimalCard from '@/components/Card/TaskAnimalCard';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { RefreshScroll } from '@/components/Scroll';
import { SelectBase } from '@/components/Selects/SelectBase';
import { genericStyles } from '@/constants';
import i18n from '@/locales/localization';
import { ROUTES } from '@/router/routes';
import { TaskDto, TaskPeriodEnum, TaskStatusEnum } from '@/types';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { SegmentedButtons, Icon, Button } from 'react-native-paper';

const TasksPage = () => {
  const theme = useAppTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [page, setPage] = useState<TaskStatusEnum>(TaskStatusEnum.TO_VALIDATE);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [period, setPeriod] = useState<TaskPeriodEnum>(TaskPeriodEnum.TODAY);
  const [isArchivedSelected, setIsArchivedSelected] = useState<boolean>(false);

  async function fetchTasks(newPageNumber = 0) {
    setIsLoading(true);
    setPageNumber(newPageNumber);
    const tasksFetched = await ApiService.tasks.getAll({
      page: newPageNumber,
      pageSize: 10,
      date: period,
      status: page,
      isArchived: isArchivedSelected ? true : undefined,
    });
    setTasks((prevTasks) => [...prevTasks, ...tasksFetched]);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      setTasks([]);
      setPageNumber(0);
      fetchTasks(0);
    }, [page, period, isArchivedSelected])
  );

  return (
    <UniversalSafeArea asView style={{ paddingHorizontal: 16 }}>
      <View style={[genericStyles.flexRow, { marginTop: 16, gap: 8 }]}>
        <SelectBase
          style={{ flex: 1 }}
          value={period}
          onValueChange={(value) => {
            setPeriod(value as TaskPeriodEnum);
          }}
          placeholder={'Séléctionner une période'}
          items={Object.values(TaskPeriodEnum).map((v, i) => ({
            key: `${i}-${v}-period`,
            label: i18n.t(`enums.period.${v}`),
            value: v,
          }))}
        />
        <Button
          style={{
            backgroundColor: isArchivedSelected
              ? theme.colors.secondaryContainer
              : 'transparent',
            borderWidth: 1,
            borderColor: theme.colors.outline,
          }}
          textColor={theme.colors.onSurface}
          icon={({ color }) => <Icon source="clock" size={18} color={color} />}
          mode={isArchivedSelected ? 'contained' : 'outlined'}
          onPress={() => setIsArchivedSelected((prev) => !prev)}
        >
          {i18n.t('enums.status.ARCHIVED')}
        </Button>
      </View>
      <SegmentedButtons
        style={{ marginTop: 8, marginBottom: 16 }}
        value={page}
        onValueChange={(value) => {
          setPage(value as TaskStatusEnum);
        }}
        buttons={Object.values(TaskStatusEnum).map((v) => ({
          label: i18n.t(`enums.status.${v}`),
          value: v,
        }))}
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
      <ButtonsAction onPress={() => router.push(ROUTES.task.create)} />
    </UniversalSafeArea>
  );
};

export default TasksPage;
