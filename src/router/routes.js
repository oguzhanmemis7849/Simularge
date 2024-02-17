const routes = [
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SelectUserInterfacepage.vue') },
      { path: '/calculation', component: () => import('pages/CalculationsPage.vue') },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: '',
    component: () => import('layouts/FullPageLayout.vue'),
    children: [
      { path: '/login', component: () => import('pages/LoginPage.vue') },
    ],
    meta: { guestOnly: true },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
