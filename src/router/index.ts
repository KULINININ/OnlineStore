import { createRouter, createWebHistory } from 'vue-router'

import { routes } from './routes'

export const router = createRouter({
  history: createWebHistory('/OnlineStore/'),
  routes: routes
})

export default router
