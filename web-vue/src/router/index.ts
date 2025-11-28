import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import PopularView from '@/views/PopularView.vue'
import EventView from '@/views/EventView.vue'
import StoreView from '@/views/StoreView.vue'
import CafeteriaView from '@/views/CafeteriaView.vue'
import CafeteriaStoreView from '@/views/CafeteriaStoreView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/popular', name: 'popular', component: PopularView },
    { path: '/event', name: 'event', component: EventView },
    { path: '/store/:id', name: 'store', component: StoreView },
    { path: '/cafeteria', name: 'cafeteria', component: CafeteriaView },
    { path: '/cafeteria/huseng', name: 'cafeteria-huseng', component: CafeteriaStoreView },
  ],
})

export default router
