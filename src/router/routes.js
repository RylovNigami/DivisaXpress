const routes = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/IndexPage.vue') },
      { path: 'chart', component: () => import('src/pages/ChartPage.vue') },
      {
        path: 'another-currencies',
        component: () => import('src/components/AnotherCurrenciesComponent.vue')
      },
      {
        path: 'index-component',
        component: () => import('src/components/IndexComponent.vue')
      },
      {
        path: 'bcv-chart',
        component: () => import('src/components/BCVChartComponent.vue')
      },
      {
        path: 'usdt-chart',
        component: () => import('src/components/USDTChartComponent.vue')
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/ErrorNotFound.vue')
  }
];

export default routes;
