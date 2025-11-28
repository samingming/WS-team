<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const services = [
  {
    id: 'cafe',
    label: '카페',
    description: '따뜻한 커피와 디저트',
    emoji: '☕️'
  },
  {
    id: 'cafeteria',
    label: '학식',
    description: '든든한 학생 식당',
    emoji: '🍝',
    link: '/cafeteria'
  }
]

const handleServiceClick = (service: (typeof services)[number]) => {
  if (service.link) {
    router.push(service.link)
  }
}
</script>

<template>
  <section class="home-screen">
    <p class="eyebrow">오늘의 추천</p>
    <h1 class="question">어떤 서비스를 이용하러 오셨나요?</h1>

    <div class="service-grid">
      <button
        v-for="service in services"
        :key="service.id"
        type="button"
        class="service-card"
        @click="handleServiceClick(service)"
      >
        <div class="service-copy">
          <span class="service-label">{{ service.label }}</span>
          <span class="service-desc">{{ service.description }}</span>
        </div>

        <span class="service-emoji" aria-hidden="true">{{ service.emoji }}</span>
      </button>
    </div>

    <section class="promo-board" aria-label="프로모션">
      <p class="promo-main">
        <span class="highlight">천원의 아침</span> 학생할인은
        <strong>멤버십</strong>에서 등록하세요
      </p>
    </section>
  </section>
</template>

<style scoped>
.home-screen {
  color: #1f2933;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 960px;
}

.eyebrow {
  font-size: 0.85rem;
  color: #8a8f98;
  margin: 0;
}

.question {
  font-size: clamp(1.5rem, 2vw, 2.3rem);
  font-weight: 700;
  line-height: 1.35;
  margin: 0;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: clamp(14px, 2vw, 24px);
}

.service-card {
  border: none;
  border-radius: 22px;
  background: #ffffff;
  padding: clamp(18px, 2.2vw, 26px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 180px;
  box-shadow: 0 15px 30px rgba(157, 165, 175, 0.2);
  cursor: pointer;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 35px rgba(146, 154, 167, 0.3);
}

.service-copy {
  text-align: left;
}

.service-label {
  font-size: 1.05rem;
  font-weight: 600;
}

.service-desc {
  display: block;
  margin-top: 4px;
  font-size: 0.85rem;
  color: #8a8f98;
}

.service-emoji {
  margin-left: auto;
  margin-top: clamp(12px, 1.5vw, 18px);
  font-size: clamp(3.5rem, 6vw, 5rem);
  line-height: 1;
}

.promo-board {
  margin-top: 8px;
  border-radius: clamp(26px, 3vw, 36px);
  background: #466122;
  padding: clamp(24px, 3vw, 36px);
  box-shadow: 0 18px 35px rgba(37, 52, 24, 0.35);
  color: #fff5cb;
  font-size: clamp(1rem, 1.4vw, 1.3rem);
  line-height: 1.5;
}

.promo-board .highlight {
  color: #ffb347;
  font-weight: 700;
}

.promo-board strong {
  color: #ffd84e;
  font-weight: 700;
}

@media (max-width: 480px) {
  .service-card {
    min-height: 150px;
  }
}
</style>
