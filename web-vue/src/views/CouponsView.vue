<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/stores/orderStore'

const orderStore = useOrderStore()
const { coupons } = storeToRefs(orderStore)

const handleUseCoupon = (id: number) => {
  orderStore.useCoupon(id)
}
</script>

<template>
  <section class="page-section">
    <h1>교환권 / 쿠폰</h1>

    <p v-if="coupons.length === 0" class="empty">발급된 교환권이 없습니다. 주문하면 교환권이 생성됩니다.</p>

    <ul v-else class="coupon-list">
      <li v-for="coupon in coupons" :key="coupon.id" class="coupon-card">
        <div>
          <h3>{{ coupon.menuName }}</h3>
          <p>{{ coupon.storeName ?? '쿠폰' }} · {{ coupon.createdAt }} · {{ coupon.quantity }}개</p>
        </div>
        <button
          class="coupon-button"
          :disabled="coupon.status === '사용됨'"
          @click="handleUseCoupon(coupon.id)"
        >
          {{ coupon.status }}
        </button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.page-section {
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

h1 {
  margin: 0;
  font-size: 1.6rem;
}

.empty {
  margin: 0;
  color: #6b7280;
}

.coupon-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.coupon-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 10px 20px rgba(84, 97, 119, 0.12);
}

.coupon-card h3 {
  margin: 0 0 4px;
  font-size: 1rem;
}

.coupon-card p {
  margin: 0;
  color: #9ba4b0;
  font-size: 0.85rem;
}

.coupon-button {
  border: none;
  border-radius: 999px;
  padding: 8px 16px;
  background: #eef2ff;
  color: #4c1d95;
  font-weight: 600;
  cursor: pointer;
}

.coupon-button:disabled {
  background: #e5e7eb;
  color: #9ca3af;
  cursor: default;
}
</style>
