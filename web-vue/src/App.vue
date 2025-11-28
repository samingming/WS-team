<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { id: 'home', label: '홈', icon: 'home', to: '/', match: '/' },
  { id: 'coupon', label: '교환권/쿠폰', icon: 'ticket', to: '/coupons', match: '/coupons' },
  { id: 'history', label: '주문 내역', icon: 'receipt', to: '/orders', match: '/orders' },
  { id: 'more', label: '더보기', icon: 'more', to: '/mypage', match: '/mypage' }
]

const isItemActive = (item: (typeof navItems)[number]) => {
  if (item.match === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(item.match)
}
</script>

<template>
  <div class="app-shell">
    <div class="screen">
      <header class="app-header">
        <div class="logo-pill">WS</div>
        <button class="icon-button" aria-label="알림">
          <svg class="bell-icon" viewBox="0 0 24 24" role="img" aria-hidden="true">
            <path
              d="M12 3a5 5 0 0 0-5 5v3.38c0 .53-.21 1.03-.58 1.41l-.96 1 0 0c-.84.87-.25 2.2.94 2.2h12.78c1.19 0 1.78-1.33.94-2.2l-.01-.01-.96-1a2 2 0 0 1-.58-1.41V8a5 5 0 0 0-5-5z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.5 19a2.5 2.5 0 0 1-5 0"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </header>

      <main class="page">
        <RouterView />
      </main>
    </div>

    <nav class="bottom-nav" aria-label="하단 메뉴">
      <ul>
        <li v-for="item in navItems" :key="item.id" :class="{ active: isItemActive(item) }">
          <RouterLink :to="item.to" class="nav-link">
            <span class="nav-icon" aria-hidden="true">
              <svg
                v-if="item.icon === 'home'"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
              >
                <path
                  d="M3.5 11 12 4l8.5 7v8.5a1.5 1.5 0 0 1-1.5 1.5h-4.5v-5h-5v5H5a1.5 1.5 0 0 1-1.5-1.5z"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linejoin="round"
                />
              </svg>
              <svg
                v-else-if="item.icon === 'ticket'"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
              >
                <path
                  d="M4 7.5h16v3a1.5 1.5 0 0 1 0 3v3H4v-3a1.5 1.5 0 0 1 0-3z"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path d="M12 7.5v9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
              </svg>
              <svg
                v-else-if="item.icon === 'receipt'"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
              >
                <path
                  d="M7 3.5h10a2 2 0 0 1 2 2v15l-3-1.5-3 1.5-3-1.5-3 1.5v-15a2 2 0 0 1 2-2z"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linejoin="round"
                />
                <path d="M9.5 8.5H15m-5.5 3.5H15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
              </svg>
              <svg
                v-else
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
              >
                <circle cx="5" cy="12" r="1.5" fill="currentColor" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                <circle cx="19" cy="12" r="1.5" fill="currentColor" />
              </svg>
            </span>
            <span class="nav-label">{{ item.label }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <button class="floating-action" aria-label="카드">
      <svg viewBox="0 0 32 32" role="img" aria-hidden="true">
        <rect x="5" y="8" width="22" height="16" rx="4" fill="currentColor" opacity="0.15" />
        <rect
          x="7"
          y="10"
          width="18"
          height="12"
          rx="3"
          fill="none"
          stroke="white"
          stroke-width="1.6"
        />
        <rect x="10" y="15" width="10" height="1.6" rx="0.8" fill="white" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: linear-gradient(180deg, #ffffff 0%, #f7f8fa 50%, #f8f2ea 100%);
  display: flex;
  justify-content: center;
}

.screen {
  width: min(1100px, 100%);
  min-height: 100vh;
  margin: 0 auto;
  padding: clamp(24px, 4vw, 64px) clamp(16px, 6vw, 96px) clamp(180px, 20vh, 260px);
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.logo-pill {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: linear-gradient(135deg, #ffd4d2, #ff9a9e);
  color: #63151a;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.04em;
}

.icon-button {
  border: none;
  background: #ffffff;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(149, 157, 165, 0.2);
  color: #1f2933;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.icon-button:focus-visible,
.bottom-nav .nav-link:focus-visible,
.floating-action:focus-visible,
.service-card:focus-visible {
  outline: 2px solid #ff5b67;
  outline-offset: 3px;
}

.bell-icon {
  width: 22px;
  height: 22px;
}

.page {
  flex: 1;
}

.bottom-nav {
  position: fixed;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  width: min(960px, calc(100% - 32px));
  background: #ffffff;
  border-radius: 28px;
  box-shadow: 0 28px 40px rgba(72, 89, 108, 0.15);
  padding: 10px 24px;
  z-index: 10;
}

.bottom-nav ul {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-link {
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 4px;
  color: #9ba4b0;
  font-size: 0.78rem;
  text-decoration: none;
}

.bottom-nav li.active .nav-link {
  color: #ff4e5c;
  font-weight: 600;
}

.nav-icon {
  width: 24px;
  height: 24px;
}

.nav-icon svg {
  width: 100%;
  height: 100%;
  stroke: currentColor;
}

.floating-action {
  position: fixed;
  left: 50%;
  bottom: 72px;
  transform: translateX(-50%);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: none;
  background: radial-gradient(circle at 30% 20%, #ff9a9e, #ff4e5c);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 18px 30px rgba(255, 78, 92, 0.5);
  z-index: 11;
}

.floating-action svg {
  width: 32px;
  height: 32px;
}

@media (max-width: 480px) {
  .screen {
    padding-bottom: 140px;
  }
}

@media (min-width: 768px) {
  .bottom-nav {
    bottom: 32px;
    padding: 12px 32px;
  }

  .floating-action {
    bottom: 110px;
  }
}

@media (min-width: 1024px) {
  .screen {
    padding-bottom: clamp(200px, 18vh, 260px);
  }

  .bottom-nav {
    bottom: 40px;
    border-radius: 32px;
  }

  .floating-action {
    bottom: 140px;
  }
}
</style>
