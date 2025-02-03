<template>
  <div class="login-container">
    <h1>Sign In</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p><button @click="signin">Sign In</button></p>
    <p><button class="google-button" @click="signInWithGoogle">Sign In With Google</button></p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'
import { useRouter } from 'vue-router'
const email = ref('')
const password = ref('')
const errMsg = ref('')
const errorMessage = ref('')
const router = useRouter()

const signin = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      console.log('Success sign in' + user)
      router.push({ path: '/' })
    })
    .catch((error) => {
      const errorMessage = error.message
      console.log('Error' + errorMessage)

      switch (error) {
        case 'auth/invalid-email':
          errMsg.value = 'Invalid email'
          break
        case 'auth/user-not-found':
          errMsg.value = 'User not found'
          break
        case 'auth/wrong-password':
          errMsg.value = 'Wrong password'
          break
        default:
          errMsg.value = 'Email or password is incorrect'
          break
      }
    })
}

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  try {
    const result = await signInWithPopup(getAuth(), provider)
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential.accessToken
    // The signed-in user info.
    const user = result.user
    console.log('User signed in: ', user)
    // Redirect to home page or any other page
    router.push('/')
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code
    const errorMessage = error.message
    const email = error.customData.email
    const credential = GoogleAuthProvider.credentialFromError(error)
    console.error('Error during sign-in: ', errorCode, errorMessage, email, credential)
    errorMessage.value = errorMessage
  }
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #1a1a1a;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}
.login-container {
  background-color: #2a2a2a;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
}
h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}
input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 4px;
  background-color: #3a3a3a;
  color: #ffffff;
}
input::placeholder {
  color: #aaaaaa;
}
button {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: #4a4a4a;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #5a5a5a;
}
.google-button {
  background-color: #db4437;
}
.google-button:hover {
  background-color: #c53929;
}
</style>
