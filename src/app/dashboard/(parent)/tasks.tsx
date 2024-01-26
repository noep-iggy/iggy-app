import { ApiService } from '@/api';
import TaskAnimalCard from '@/components/Card/TaskAnimalCard';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { RefreshScroll } from '@/components/Scroll';
import { SelectBase } from '@/components/Selects/SelectBase';
import { genericStyles } from '@/constants';
import i18n from '@/locales/localization';
import { ROUTES } from '@/router/routes';
import { TaskDto, TaskPeriodEnum, TaskStatusEnum } from '@/types';
import { Stack, router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  useTheme,
  SegmentedButtons,
  Icon,
  Text,
  Button,
} from 'react-native-paper';

const TasksPage = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [page, setPage] = useState<TaskStatusEnum>(TaskStatusEnum.TODO);
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
                paddingHorizontal: 7,
                paddingVertical: 7,
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
      <View style={[genericStyles.flexRow, { marginTop: 16, gap: 8 }]}>
        <SelectBase
          style={{ flex: 1 }}
          name="period"
          value={period}
          onValueChange={(value) => {
            setPeriod(value as TaskPeriodEnum);
          }}
          items={Object.values(TaskPeriodEnum).map((v) => ({
            key: v,
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
          textColor={'black'}
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
          key: v,
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
    </UniversalSafeArea>
  );
};

export default TasksPage;
