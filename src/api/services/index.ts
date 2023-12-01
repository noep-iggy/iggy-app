import { HouseApiService } from './HousesService';
import { AffiliateApiService } from './affiliatesService';
import { AnimalApiService } from './animalsService';
import { AuthApiService } from './authService';
import { BillingPlanApiService } from './billingPlansService';
import { JoinCodeApiService } from './joinCodeService';
import { MediaApiService } from './mediaService';
import { RecurrenceApiService } from './recurrencesService';
import { TaskApiService } from './tasksService';
import { UserApiService } from './userService';

export const ApiService = {
  affiliates: AffiliateApiService,
  animals: AnimalApiService,
  auth: AuthApiService,
  billingPlans: BillingPlanApiService,
  house: HouseApiService,
  joinCode: JoinCodeApiService,
  media: MediaApiService,
  recurrences: RecurrenceApiService,
  tasks: TaskApiService,
  users: UserApiService,
};
