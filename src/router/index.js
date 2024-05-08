import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/MainView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('../views/DetailView.vue')
    },
    {
      path: '/review',
      name: 'review',
      component: () => import('../views/ReviewWriteView.vue')
    }
  ]
})

export default router
