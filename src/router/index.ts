import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/Auth/Login.vue')
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'wallet',
        component: () => import('@/views/Wallet/wallet.vue')
      },
      {
        path: 'newtrx',
        component: () => import('@/views/NewTransaction.vue')
      },
      {
        path: 'news',
        component: () => import('@/views/News.vue')
      },
      {
        path: 'profile',
        component: () => import('@/views/Profile.vue')
      },
    ]
  },
  {
    path: '/register',
    component: () => import('@/views/Auth/Register.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/Auth/Login.vue')
  },
  {
    path: '/wallettypes',
    component: () => import('@/views/Wallet/WalletTypes.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
