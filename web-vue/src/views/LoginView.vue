<template>
  <div class="login">
    <h1>로그인</h1>

    <div class="button-group">
      <button @click="handleGoogleLogin">구글 로그인</button>
      <button @click="handleEmailLogin">이메일 로그인</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { googleLogin, emailLogin } from '@/firebase/firebase'

const router = useRouter()

const handleGoogleLogin = async () => {
  try {
    await googleLogin()          // 인자 없음
    router.push({ name: 'home' }) // 로그인 성공 → 홈으로
  } catch (err) {
    console.error(err)
    alert('구글 로그인에 실패했습니다.')
  }
}

const handleEmailLogin = async () => {
  try {
    await emailLogin()           // 인자 없음 (현재 타입에 맞춤)
    router.push({ name: 'home' })
  } catch (err) {
    console.error(err)
    alert('이메일 로그인에 실패했습니다.')
  }
}
</script>

<style scoped>
.login {
  max-width: 360px;
  margin: 40px auto;
  padding: 24px 20px;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 18px 35px rgba(84, 97, 119, 0.12);
  text-align: center;
}
.button-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}
button {
  padding: 10px 12px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
}
</style>
