<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cafeStores, cafeCategories, type CafeCategory } from './cafeData'

const router = useRouter()
const route = useRoute()

const storeId = computed(() => route.params.store as string)
const currentStore = computed(() => cafeStores.find((store) => store.id === storeId.value))

const defaultCategory: CafeCategory =
  cafeCategories[0] ?? { key: 'default', title: '전체', icon: '☕️', menus: [] }

const activeKey = ref(defaultCategory.key)
const activeCategory = computed(
  () => cafeCategories.find((category) => category.key === activeKey.value) ?? defaultCategory
)

const selectCategory = (key: string) => {
  activeKey.value = key
}

const goToMenu = (menuSlug: string) => {
  if (!currentStore.value) {
    return
    }
  router.push({ name: 'cafe-order', params: { store: currentStore.value.id, category: activeKey.value, menu: menuSlug } })
}
</script>

<template>
  <section class="cafe-store">
    <header class="store-toolbar">
      <button class="icon-button" aria-label="뒤로 가기" @click="router.back()">
        <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path d="M15 4 7 12l8 8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      </button>

      <div class="toolbar-icons">
        <button class="icon-button" aria-label="교환권">
          <span>🎟️</span>
        </button>
        <button class="icon-button" aria-label="주문 내역">
          <span>🧾</span>
        </button>
      </div>
    </header>

    <template v-if="currentStore">
      <div class="store-hero">
        <div class="logo">COOP CAFE</div>
        <div>
          <p class="eyebrow">{{ currentStore.subtitle }}</p>
          <h1>{{ currentStore.name }}</h1>
          <div class="tag-group">
            <span>매장</span>
            <span>테이크아웃</span>
          </div>
        </div>
      </div>

      <nav class="category-tabs">
        <button
          v-for="category in cafeCategories"
          :key="category.key"
          type="button"
          :class="{ active: activeKey === category.key }"
          @click="selectCategory(category.key)"
        >
          <span>{{ category.icon }}</span>
          <span class="tab-text">{{ category.title }}</span>
        </button>
      </nav>

      <section v-if="activeCategory" class="menu-section">
        <h2>{{ activeCategory.title }}</h2>
        <ul class="menu-list">
          <li v-for="menu in activeCategory.menus" :key="menu.slug" class="menu-card" @click="goToMenu(menu.slug)">
            <div>
              <h3>{{ menu.name }}</h3>
              <p>{{ menu.description ?? '매장에서 바로 추출한 메뉴' }}</p>
            </div>
            <div class="meta">
              <span class="price">{{ menu.price.toLocaleString() }}원</span>
              <div class="cup-icon">☕️</div>
            </div>
          </li>
        </ul>
      </section>
    </template>

    <div v-else class="empty-state">
      <p>해당 매장을 찾을 수 없습니다.</p>
      <button class="icon-button" @click="router.push('/cafe')">목록으로 돌아가기</button>
    </div>
  </section>
</template>

<style scoped>
.cafe-store {
  max-width: 960px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.store-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-button {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: none;
  background: #fff;
  box-shadow: 0 10px 20px rgba(99, 110, 123, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

.toolbar-icons {
  display: flex;
  gap: 12px;
}

.store-hero {
  display: flex;
  gap: 16px;
  background: #fff;
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 18px 35px rgba(84, 97, 119, 0.13);
}

.logo {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  background: #f6c7b0;
  color: #c53030;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.95rem;
}

.eyebrow {
  margin: 0;
  color: #8a8f98;
  font-size: 0.9rem;
}

.tag-group {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.tag-group span {
  padding: 6px 12px;
  border-radius: 999px;
  background: #eef2ff;
  color: #6570a7;
  font-size: 0.8rem;
}

.category-tabs {
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 4px;
}

.category-tabs button {
  border: none;
  border-radius: 999px;
  padding: 12px 18px;
  background: #f4f6fb;
  color: #6b7280;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  cursor: pointer;
  box-shadow: inset 0 0 0 1px rgba(99, 110, 123, 0.08);
}

.category-tabs button.active {
  background: #ff4e5c;
  color: white;
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.1);
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.menu-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 12px 24px rgba(84, 97, 119, 0.12);
  cursor: pointer;
}

.menu-card h3 {
  margin: 0 0 4px;
  font-size: 1rem;
}

.menu-card p {
  margin: 0;
  color: #9ba4b0;
  font-size: 0.85rem;
}

.meta {
  text-align: right;
  color: #475569;
}

.price {
  display: block;
  font-size: 1rem;
  color: #111827;
}

.cup-icon {
  margin-top: 6px;
}

.empty-state {
  text-align: center;
  color: #6b7280;
}
</style>
