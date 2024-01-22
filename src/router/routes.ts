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
    list: 'dashboard/(parent)/animals' as never,
    detail: 'animal/detail' as never,
  },
  task: {
    create: 'tasks/create' as never,
    list: 'dashboard/(parent)/tasks' as never,
    detail: 'tasks/detail' as never,
    childDetail: 'tasks/child-detail' as never,
  },
};
