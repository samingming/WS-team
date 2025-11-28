import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import PopularView from '@/views/PopularView.vue'
import EventView from '@/views/EventView.vue'
import StoreView from '@/views/StoreView.vue'
import CafeteriaView from '@/views/CafeteriaView.vue'
import CafeView from '@/views/CafeView.vue'
import CafeStoreView from '@/views/CafeStoreView.vue'
import CafeOrderView from '@/views/CafeOrderView.vue'     // ★ 추가
import CafeteriaStoreView from '@/views/CafeteriaStoreView.vue'
import CafeteriaCounterView from '@/views/CafeteriaCounterView.vue'
import CafeteriaOrderView from '@/views/CafeteriaOrderView.vue'
import CouponsView from '@/views/CouponsView.vue'
import OrdersView from '@/views/OrdersView.vue'
import MyPageView from '@/views/MyPageView.vue'
import RecommendView from '@/views/RecommendView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 🔹 루트로 들어오면 무조건 /login으로 보내기
    { path: '/', redirect: '/login' },

    // 로그인
    { path: '/login', name: 'login', component: LoginView },

    // 홈은 /home 으로 사용
    { path: '/home', name: 'home', component: HomeView },

    { path: '/popular', name: 'popular', component: PopularView },
    { path: '/event', name: 'event', component: EventView },
    { path: '/store/:id', name: 'store', component: StoreView },
    { path: '/cafeteria', name: 'cafeteria', component: CafeteriaView },
    { path: '/cafe', name: 'cafe', component: CafeView },
    { path: '/cafe/:id', name: 'cafe-store', component: CafeStoreView },
    { path: '/cafe/:id/menu/:slug', name: 'cafe-order', component: CafeOrderView },
    { path: '/cafeteria/huseng', name: 'cafeteria-huseng', component: CafeteriaStoreView },
    { path: '/cafeteria/huseng/:slug', name: 'cafeteria-counter', component: CafeteriaCounterView },
    { path: '/cafeteria/huseng/:slug/menu/:menu', name: 'cafeteria-order', component: CafeteriaOrderView },
    { path: '/coupons', name: 'coupons', component: CouponsView },
    { path: '/orders', name: 'orders', component: OrdersView },
    { path: '/mypage', name: 'mypage', component: MyPageView },
    { path: '/recommend/:filter?', name: 'recommend', component: RecommendView },
  ],
})


export default router
