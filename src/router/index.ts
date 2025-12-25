// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import PopularView from '@/views/PopularView.vue'
import EventView from '@/views/EventView.vue'
import StoreView from '@/views/StoreView.vue'
import CafeteriaView from '@/views/CafeteriaView.vue'
import CafeView from '@/views/CafeView.vue'
import CafeStoreView from '@/views/CafeStoreView.vue'
import CafeOrderView from '@/views/CafeOrderView.vue'
import CafeteriaStoreView from '@/views/CafeteriaStoreView.vue'
import CafeteriaCounterView from '@/views/CafeteriaCounterView.vue'
import CafeteriaOrderView from '@/views/CafeteriaOrderView.vue'
import CouponsView from '@/views/CouponsView.vue'
import OrdersView from '@/views/OrdersView.vue'
import MyPageView from '@/views/MyPageView.vue'
import RecommendView from '@/views/RecommendView.vue'
import NotificationsView from '@/views/NotificationsView.vue'
import CartView from '@/views/CartView.vue'

// Firebase Auth 인스턴스
import { auth } from '@/firebase/firebase'

// 로그인 상태 복원 완료 여부
let authReady = false
let authReadyPromise: Promise<void> | null = null

const ensureAuthReady = (): Promise<void> => {
  if (authReady) return Promise.resolve()
  if (!authReadyPromise) {
    authReadyPromise = new Promise<void>((resolve) => {
      onAuthStateChanged(auth, () => {
        authReady = true
        resolve()
      })
    })
  }
  return authReadyPromise
}

// 퍼시스턴스 설정: 새로고침 후에도 로그인 유지
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.error('Failed to set auth persistence', err)
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: LoginView, meta: { requiresGuest: true } },
    { path: '/home', name: 'home', component: HomeView, meta: { requiresAuth: true } },
    { path: '/popular', name: 'popular', component: PopularView, meta: { requiresAuth: true } },
    { path: '/event', name: 'event', component: EventView, meta: { requiresAuth: true } },
    { path: '/store/:id', name: 'store', component: StoreView, meta: { requiresAuth: true } },
    { path: '/cafeteria', name: 'cafeteria', component: CafeteriaView, meta: { requiresAuth: true } },
    { path: '/cafe', name: 'cafe', component: CafeView, meta: { requiresAuth: true } },
    { path: '/cafe/:id', name: 'cafe-store', component: CafeStoreView, meta: { requiresAuth: true } },
    { path: '/cafe/:id/menu/:slug', name: 'cafe-order', component: CafeOrderView, meta: { requiresAuth: true } },
    { path: '/cafeteria/huseng', name: 'cafeteria-huseng', component: CafeteriaStoreView, meta: { requiresAuth: true } },
    { path: '/cafeteria/huseng/:slug', name: 'cafeteria-counter', component: CafeteriaCounterView, meta: { requiresAuth: true } },
    { path: '/cafeteria/huseng/:slug/menu/:menu', name: 'cafeteria-order', component: CafeteriaOrderView, meta: { requiresAuth: true } },
    { path: '/coupons', name: 'coupons', component: CouponsView, meta: { requiresAuth: true } },
    { path: '/orders', name: 'orders', component: OrdersView, meta: { requiresAuth: true } },
    { path: '/mypage', name: 'mypage', component: MyPageView, meta: { requiresAuth: true } },
    { path: '/notifications', name: 'notifications', component: NotificationsView, meta: { requiresAuth: true } },
    { path: '/cart', name: 'cart', component: CartView, meta: { requiresAuth: true } },
    { path: '/recommend/:filter?', name: 'recommend', component: RecommendView, meta: { requiresAuth: true } },
  ],
})

router.beforeEach(
  async (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
    // Firebase가 currentUser를 복원할 때까지 대기
    await ensureAuthReady()
    const user = getAuth().currentUser

    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    const requiresGuest = to.matched.some((record) => record.meta.requiresGuest)

    if (requiresAuth && !user) {
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }

    if (requiresGuest && user) {
      next({ name: 'home' })
      return
    }

    next()
  }
)

export default router
