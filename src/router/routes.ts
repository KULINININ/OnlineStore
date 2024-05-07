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
    redirect: '/catalog/sistemy-hraneniya',
    children: [
      {
        path: 'sistemy-hraneniya',
        name: 'sistemy-hraneniya',
        redirect: '/catalog/sistemy-hraneniya/komplekty-stellazhnyh-sistem',
        children: [
          {
            path: 'komplekty-stellazhnyh-sistem',
            name: 'komplekty-stellazhnyh-sistem',
            component: () => import('../pages/TheCatalog.vue')
          }
        ]
      }
    ]
  }
]
