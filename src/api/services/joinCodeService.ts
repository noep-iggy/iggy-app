import { JoinCodeDto } from '@/types';
import { API_ROUTES } from '../apiRoutes';
import { HttpService } from '../httpService';

const createParent = async (): Promise<JoinCodeDto> => {
  return (await HttpService.get(API_ROUTES.joinCode.create.parent)).data;
};

const createChild = async (): Promise<JoinCodeDto> => {
  return (await HttpService.get(API_ROUTES.joinCode.create.child)).data;
};

const getByCode = async (code: string): Promise<JoinCodeDto> => {
  return (await HttpService.get(API_ROUTES.joinCode.getByCode(code))).data;
};

export const JoinCodeApiService = {
  create: {
    parent: createParent,
    child: createChild,
  },
  getByCode,
};
