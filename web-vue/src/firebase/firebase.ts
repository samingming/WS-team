import { initializeApp, type FirebaseOptions } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

const missingConfigKeys = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key)

let auth: ReturnType<typeof getAuth> | null = null
let provider: GoogleAuthProvider | null = null

if (missingConfigKeys.length === 0) {
  const app = initializeApp(firebaseConfig as FirebaseOptions)
  auth = getAuth(app)
  provider = new GoogleAuthProvider()
} else if (import.meta.env.DEV) {
  console.warn(
    `Firebase env vars are missing: ${missingConfigKeys.join(", ")}. Login features are disabled until they are added.`
  )
}

const ensureFirebaseReady = () => {
  if (!auth || !provider) {
    alert('Firebase settings are missing. Please add them to a .env file to use login.')
    return null
  }

  return { auth, provider }
}

export const googleLogin = async () => {
  const deps = ensureFirebaseReady()
  if (!deps) {
    return
  }

  try {
    const result = await signInWithPopup(deps.auth, deps.provider)
    console.log(result.user)
    alert(`Google login success: ${result.user.email ?? ''}`)
  } catch (error) {
    console.error(error)
    alert('Google login failed.')
  }
}

export const emailLogin = async () => {
  const deps = ensureFirebaseReady()
  if (!deps) {
    return
  }

  try {
    const result = await signInWithEmailAndPassword(
      deps.auth,
      'test@example.com',
      '123456'
    )
    console.log(result.user)
    alert(`Email login success: ${result.user.email ?? ''}`)
  } catch (error) {
    console.error(error)
    alert('Email login failed.')
  }
}
