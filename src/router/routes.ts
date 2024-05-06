import { type RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: '/catalog'
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: () => import('../pages/TheCatalog.vue')
  }
]
