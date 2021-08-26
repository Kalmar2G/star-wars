import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/pages/MainPage.vue'),
  },
  {
    path: '/characters',
    component: () => import('@/pages/CharactersPage.vue'),
  },
  {
    path: '/starships',
    component: () => import('@/pages/StarshipsPage.vue'),
  },
];
export default new VueRouter({
  mode: 'history',
  routes,
});
