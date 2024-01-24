import { RefuseTaskAPi } from './../../types/api/Task';
import {
  CheckTaskApi,
  CreateTaskApi,
  TaskSearchParams,
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

const getAll = async (params: TaskSearchParams): Promise<TaskDto[]> => {
  return (await HttpService.get(API_ROUTES.tasks.getAll, { params })).data;
};

const getById = async (id: string): Promise<TaskDto> => {
  return (await HttpService.get(API_ROUTES.tasks.getById(id))).data;
};

const updateById = async (
  id: string,
  task: UpdateTaskApi
): Promise<TaskDto> => {
  return (await HttpService.patch(API_ROUTES.tasks.updateById(id), task)).data;
};

const check = async (id: string, body: CheckTaskApi): Promise<TaskDto> => {
  return (await HttpService.patch(API_ROUTES.tasks.check(id), body)).data;
};

const validate = async (id: string): Promise<TaskDto> => {
  return (await HttpService.get(API_ROUTES.tasks.validate(id))).data;
};

const refuse = async (id: string, body: RefuseTaskAPi): Promise<TaskDto> => {
  return (await HttpService.patch(API_ROUTES.tasks.refuse(id), body)).data;
};

const deleteById = async (id: string): Promise<void> => {
  return await HttpService.delete(API_ROUTES.tasks.deleteById(id));
};

export const TaskApiService = {
  me,
  create,
  getAll,
  getById,
  updateById,
  check,
  validate,
  refuse,
  deleteById,
};
