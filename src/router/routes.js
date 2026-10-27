const routes = [
  {
    path: '/',
    // Como estás en src/router/routes.js, para ir a src/layouts sales una carpeta con '../'
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('../pages/IndexPage.vue') },
      { path: 'chart', component: () => import('../pages/ChartPage.vue') },
      {
        path: 'another-currencies',
        component: () => import('../components/AnotherCurrenciesComponent.vue'),
      },
      {
        path: 'index-component',
        component: () => import('../components/IndexComponent.vue'),
      },
      {
        path: 'bcv-chart',
        component: () => import('../components/BCVChartComponent.vue'),
      },
      {
        path: 'usdt-chart',
        component: () => import('../components/USDTChartComponent.vue'),
      },
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.vue')
  }
];

export default routes;
