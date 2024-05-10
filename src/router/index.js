import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/MainView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/SearchView.vue'),
      props: true
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('@/views/review/ReviewDetailView.vue'),
      props: true
    },
    {
      path: '/review',
      name: 'review',
      component: () => import('@/views/review/ReviewWriteView.vue')
    },
    {
      path: '/board/:boardId',
      name: 'boardDetailView',
      component: () => import('@/views/board/BoardDetailView.vue')
    },
    {
      path: '/board',
      name: 'board',
      component: () => import('@/views/board/BoardListView.vue')
    },
    {
      path: '/board/wirte',
      name: 'boardWrite',
      component: () => import('@/views/board/BoardWriteView.vue')
    }
  ]
})

export default router
