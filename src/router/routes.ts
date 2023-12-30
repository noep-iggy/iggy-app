export const ROUTES = {
  auth: {
    index: '/' as never,
    login: 'auth/login' as never,
    register: 'auth/register' as never,
    join: 'auth/join' as never,
  },
  dashboard: {
    parent: 'dashboard/parent' as never,
    child: 'dashboard/child' as never,
  },
  animal: {
    create: 'animal/create' as never,
    details: 'dashboard/(parent)/[id]' as never,
  },
};
