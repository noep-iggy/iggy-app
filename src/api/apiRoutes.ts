import { AnimalTypeEnum, BillingPlanTypeEnum, TaskStatusEnum } from '@/types';

export const API_ROUTES = {
  affiliates: {
    getById: (id: string) => `/affiliates/${id}`,
    getByAnimalType: (animalType: AnimalTypeEnum) =>
      `/affiliates/type/${animalType}`,
  },
  animals: {
    create: '/animals',
    getById: (id: string) => `/animals/${id}`,
    updateById: (id: string) => `/animals/${id}`,
    deleteById: (id: string) => `/animals/${id}`,
  },
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    join: (code: string) => `/auth/join/${code}`,
  },
  billingPlans: {
    getAll: '/billing-plans',
    getByType: (type: BillingPlanTypeEnum) => `/billing-plans/${type}`,
  },
  media: {
    upload: '/file-upload',
  },
  houses: {
    create: '/houses',
    get: '/houses',
    update: '/houses',
    getUsers: '/houses/users',
    getJoinCode: '/houses/join-code',
    getAnimals: '/houses/animals',
    getAffiliates: '/houses/affiliates',
  },
  joinCode: {
    create: {
      parent: 'join-code/create/parent',
      child: 'join-code/create/child',
    },
  },
  recurrences: {
    deleteById: (id: string) => `/recurrences/${id}`,
    getById: (id: string) => `/recurrences/${id}`,
  },
  tasks: {
    me: 'users/me/tasks',
    create: '/tasks',
    getAll: '/tasks',
    getByStatus: (status: TaskStatusEnum) => `/tasks/status/${status}`,
    getById: (id: string) => `/tasks/${id}`,
    updateById: (id: string) => `/tasks/${id}`,
    check: (id: string) => `/tasks/${id}/check`,
    validate: (id: string) => `/tasks/${id}/validate`,
    refuse: (id: string) => `/tasks/${id}/refuse`,
    deleteById: (id: string) => `/tasks/${id}`,
  },
  users: {
    me: '/users/me',
    updateMe: '/users/me',
    deleteMe: '/users/me',
    updateById: (id: string) => `/users/${id}`,
    deleteById: (id: string) => `/users/${id}`,
  },
};
