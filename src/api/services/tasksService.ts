import {
  CreateTaskApi,
  SearchParams,
  TaskDto,
  TaskStatusEnum,
  UpdateTaskApi,
} from '@/types';
import { API_ROUTES } from '../apiRoutes';
import { HttpService } from '../httpService';

const me = async (): Promise<TaskDto[]> => {
  return (await HttpService.get(API_ROUTES.tasks.me)).data;
};

const create = async (task: CreateTaskApi): Promise<TaskDto> => {
  return (await HttpService.post(API_ROUTES.tasks.create, task)).data;
};

const getAll = async (params: SearchParams): Promise<TaskDto[]> => {
  return (await HttpService.get(API_ROUTES.tasks.getAll, { params })).data;
};

const getById = async (id: string): Promise<TaskDto> => {
  return (await HttpService.get(API_ROUTES.tasks.getById(id))).data;
};

const getAnimalTasks = async (
  id: string,
  params: SearchParams
): Promise<TaskDto[]> => {
  return (await HttpService.get(API_ROUTES.tasks.animal(id), { params })).data;
};

const getByStatus = async (
  status: TaskStatusEnum,
  params: SearchParams
): Promise<TaskDto[]> => {
  return (
    await HttpService.get(API_ROUTES.tasks.getByStatus(status), { params })
  ).data;
};

const getArchive = async (params: SearchParams): Promise<TaskDto[]> => {
  return (await HttpService.get(API_ROUTES.tasks.getArchive, { params })).data;
};

const updateById = async (
  id: string,
  task: UpdateTaskApi
): Promise<TaskDto> => {
  return (await HttpService.patch(API_ROUTES.tasks.updateById(id), task)).data;
};

const check = async (id: string): Promise<TaskDto> => {
  return (await HttpService.patch(API_ROUTES.tasks.check(id))).data;
};

const validate = async (id: string): Promise<TaskDto> => {
  return (await HttpService.get(API_ROUTES.tasks.validate(id))).data;
};

const refuse = async (id: string): Promise<TaskDto> => {
  return (await HttpService.patch(API_ROUTES.tasks.refuse(id))).data;
};

const deleteById = async (id: string): Promise<void> => {
  return await HttpService.delete(API_ROUTES.tasks.deleteById(id));
};

export const TaskApiService = {
  me,
  create,
  getAll,
  getById,
  getByStatus,
  updateById,
  check,
  validate,
  refuse,
  deleteById,
  getArchive,
  getAnimalTasks,
};
