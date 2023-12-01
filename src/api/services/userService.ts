import { UpdateUserApi, UserDto } from '@/types';
import { API_ROUTES } from '../apiRoutes';
import { HttpService } from '../httpService';

const me = async (): Promise<UserDto> => {
  return (await HttpService.get(API_ROUTES.users.me)).data;
};

const updateMe = async (payload: UpdateUserApi): Promise<UserDto> => {
  return (await HttpService.patch(API_ROUTES.users.updateMe, payload)).data;
};

const deleteMe = async (): Promise<void> => {
  await HttpService.delete(API_ROUTES.users.deleteMe);
};

const updateById = async (
  id: string,
  payload: UpdateUserApi
): Promise<UserDto> => {
  return (await HttpService.patch(API_ROUTES.users.updateById(id), payload))
    .data;
};

const deleteById = async (id: string): Promise<void> => {
  await HttpService.delete(API_ROUTES.users.deleteById(id));
};

export const UserApiService = {
  me,
  updateMe,
  deleteMe,
  updateById,
  deleteById,
};
