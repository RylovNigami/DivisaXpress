const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: "AnotherCurrenciesComponent",
        component: () => import('components/AnotherCurrenciesComponent.vue'),
      },
      {
        path: "ComparativeFinanceComponent",
        component: () => import('components/ComparativeFinanceComponent.vue'),
      },
      {
        path: "IndexComponent",
        component: () => import('components/IndexComponent.vue'),
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
