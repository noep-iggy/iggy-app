import { AnimalDto, CreateAnimalApi, UpdateAnimalApi } from '@/types';
import { API_ROUTES } from '../apiRoutes';
import { HttpService } from '../httpService';

const create = async (payload: CreateAnimalApi): Promise<AnimalDto> => {
  return (await HttpService.post(API_ROUTES.animals.create, payload)).data;
};

const getById = async (id: string): Promise<AnimalDto> => {
  return (await HttpService.get(API_ROUTES.animals.getById(id))).data;
};

const updateById = async (
  id: string,
  payload: UpdateAnimalApi
): Promise<AnimalDto> => {
  return (await HttpService.patch(API_ROUTES.animals.updateById(id), payload))
    .data;
};

const deleteById = async (id: string): Promise<void> => {
  return await HttpService.delete(API_ROUTES.animals.deleteById(id));
};

export const AnimalApiService = {
  create,
  getById,
  updateById,
  deleteById,
};
