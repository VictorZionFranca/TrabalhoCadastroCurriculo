import { createRouter, createWebHistory } from 'vue-router';
import LandingHome from '../views/LandingHome.vue';
import CadastrarView from '../views/CadastrarCurriculo.vue';
import CurriculosView from '../views/VerCurriculos.vue';

const routes = [
  {
    path: '/',
    name: 'LandingHome',
    component: LandingHome,
  },
  {
    path: '/cadastrar',
    name: 'Cadastrar',
    component: CadastrarView,
  },
  {
    path: '/curriculos',
    name: 'Curriculos',
    component: CurriculosView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
