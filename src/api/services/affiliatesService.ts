import { AffiliateDto, AnimalTypeEnum } from '@/types';
import { API_ROUTES } from '../apiRoutes';
import { HttpService } from '../httpService';

const getById = async (id: string): Promise<AffiliateDto> => {
  return (await HttpService.get(API_ROUTES.affiliates.getById(id))).data;
};

const getByAnimalType = async (
  animalType: AnimalTypeEnum
): Promise<AffiliateDto[]> => {
  return (
    await HttpService.get(API_ROUTES.affiliates.getByAnimalType(animalType))
  ).data;
};

export const AffiliateApiService = {
  getById,
  getByAnimalType,
};
