import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth'

// 👉 여기는 네 Firebase 콘솔에서 복붙해와야 해!
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    console.log('구글 로그인 성공:', result.user)
    alert(`구글 로그인 성공: ${result.user.email}`)
  } catch (error) {
    console.error('구글 로그인 에러:', error)
    alert('구글 로그인 실패')
  }
}

export const emailLogin = async () => {
  // 이건 테스트용: 나중에 폼 만들어서 이메일/비번 받으면 됨
  const email = 'test@example.com'
  const password = '123456'

  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    console.log('이메일 로그인 성공:', result.user)
    alert(`이메일 로그인 성공: ${result.user.email}`)
  } catch (error) {
    console.error('이메일 로그인 에러:', error)
    alert('이메일 로그인 실패')
  }
}
