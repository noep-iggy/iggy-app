import { AuthLoginApi, RegisterApi } from '@/types';
import { API_ROUTES } from '../apiRoutes';
import { HttpService } from '../httpService';

const login = async (payload: AuthLoginApi): Promise<string> => {
  return (await HttpService.post(API_ROUTES.auth.login, payload)).data
    .access_token;
};

const register = async (payload: RegisterApi): Promise<string> => {
  return (await HttpService.post(API_ROUTES.auth.register, payload)).data
    .access_token;
};

const join = async (code: string): Promise<string> => {
  return (await HttpService.post(API_ROUTES.auth.join(code))).data.access_token;
};

export const AuthApiService = {
  login,
  register,
  join,
};
