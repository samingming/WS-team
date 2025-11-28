<template>
  <div class="login">
    <h1>로그인</h1>

    <div style="margin-bottom: 12px">
      <button @click="handleGoogleLogin">구글 로그인</button>
    </div>

    <div>
      <button @click="handleEmailLogin">이메일 로그인</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { googleLogin, emailLogin } from '@/firebase/firebase'

const handleGoogleLogin = async () => {
  await googleLogin()
}

const handleEmailLogin = async () => {
  await emailLogin()
}
</script>
