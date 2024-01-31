import {
  AffiliateDto,
  AffiliateSearchParams,
  ApiSearchResponse,
} from '@/types';
import { API_ROUTES } from '../apiRoutes';
import { HttpService } from '../httpService';

const getById = async (id: string): Promise<AffiliateDto> => {
  return (await HttpService.get(API_ROUTES.affiliates.getById(id))).data;
};

const getAll = async (
  params: AffiliateSearchParams
): Promise<ApiSearchResponse<AffiliateDto>> => {
  return (await HttpService.get(API_ROUTES.affiliates.getAll, { params })).data;
};

const getBrands = async (): Promise<string[]> => {
  return (await HttpService.get(API_ROUTES.affiliates.getBrands)).data;
};

export const AffiliateApiService = {
  getById,
  getAll,
  getBrands,
};
