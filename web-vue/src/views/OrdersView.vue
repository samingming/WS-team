<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/stores/orderStore'

const orderStore = useOrderStore()
const { orders } = storeToRefs(orderStore)
</script>

<template>
  <section class="page-section">
    <h1>주문 내역</h1>

    <p v-if="orders.length === 0" class="empty">아직 주문 기록이 없습니다. 맛있는 메뉴를 주문해 보세요!</p>

    <ul v-else class="order-list">
      <li v-for="order in orders" :key="order.id" class="order-card">
        <div>
          <h3>{{ order.menuName }}</h3>
          <p>{{ order.storeName ?? '주문' }} · {{ order.orderedAt }}</p>
        </div>
        <div class="order-meta">
          <span>{{ order.quantity }}개</span>
          <strong>{{ order.totalPrice.toLocaleString() }}원</strong>
        </div>
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

.order-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.order-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 10px 20px rgba(84, 97, 119, 0.12);
}

.order-card h3 {
  margin: 0 0 4px;
  font-size: 1rem;
}

.order-card p {
  margin: 0;
  color: #9ba4b0;
  font-size: 0.85rem;
}

.order-meta {
  text-align: right;
  color: #475569;
}

.order-meta strong {
  display: block;
  font-size: 1rem;
  color: #111827;
}
</style>
