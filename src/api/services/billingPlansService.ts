import { BillingPlanDto, BillingPlanTypeEnum } from '@/types';
import { API_ROUTES } from '../apiRoutes';
import { HttpService } from '../httpService';

const getAll = async (): Promise<BillingPlanDto[]> => {
  return (await HttpService.get(API_ROUTES.billingPlans.getAll)).data;
};

const getByType = async (
  type: BillingPlanTypeEnum
): Promise<BillingPlanDto> => {
  return (await HttpService.get(API_ROUTES.billingPlans.getByType(type))).data;
};

export const BillingPlanApiService = {
  getAll,
  getByType,
};
