import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/content',
    name: 'Content',
    component: () => import('@/views/Content.vue'),
    children: [
      {
        path: 'manufacturer',
        name: 'manufacturer',
        component: () => import('@/views/Manufacturer.vue')
      },
      {
        path: 'manufacturerDetail',
        name: 'manufacturerDetail',
        component: () => import('@/views/ManufacturerDetail.vue')
      },
      {
        path: 'manufacturerOexpo',
        name: 'manufacturerOexpo',
        component: () => import('@/views/ManufacturerOexpo.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
