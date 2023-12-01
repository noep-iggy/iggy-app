import {
  AffiliateDto,
  AnimalDto,
  CreateHouseApi,
  HouseDto,
  JoinCodeDto,
  UpdateHouseApi,
  UserDto,
} from '@/types';
import { API_ROUTES } from '../apiRoutes';
import { HttpService } from '../httpService';

const create = async (payload: CreateHouseApi): Promise<HouseDto> => {
  return (await HttpService.post(API_ROUTES.houses.create, payload)).data;
};

const get = async (): Promise<HouseDto> => {
  return (await HttpService.get(API_ROUTES.houses.get)).data;
};

const update = async (payload: UpdateHouseApi): Promise<HouseDto> => {
  return (await HttpService.patch(API_ROUTES.houses.update, payload)).data;
};

const getUsers = async (): Promise<UserDto[]> => {
  return (await HttpService.get(API_ROUTES.houses.getUsers)).data;
};

const getJoinCode = async (): Promise<JoinCodeDto> => {
  return (await HttpService.get(API_ROUTES.houses.getJoinCode)).data;
};

const getAnimals = async (): Promise<AnimalDto[]> => {
  return (await HttpService.get(API_ROUTES.houses.getAnimals)).data;
};

const getAffiliates = async (): Promise<AffiliateDto[]> => {
  return (await HttpService.get(API_ROUTES.houses.getAffiliates)).data;
};

export const HouseApiService = {
  create,
  get,
  update,
  getUsers,
  getJoinCode,
  getAnimals,
  getAffiliates,
};
