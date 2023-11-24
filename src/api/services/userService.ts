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

export const UserApiService = {
  me,
  updateMe,
  deleteMe,
};
