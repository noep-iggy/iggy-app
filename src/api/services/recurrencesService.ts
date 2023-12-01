import { RecurrenceDto } from '@/types';
import { API_ROUTES } from '../apiRoutes';
import { HttpService } from '../httpService';

const deleteById = async (id: string): Promise<RecurrenceDto> => {
  return await HttpService.delete(API_ROUTES.recurrences.deleteById(id));
};

const getById = async (id: string): Promise<RecurrenceDto> => {
  return (await HttpService.get(API_ROUTES.recurrences.getById(id))).data;
};

export const RecurrenceApiService = {
  deleteById,
  getById,
};
