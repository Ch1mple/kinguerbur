<template>
  <div class="login-container">
    <h1>Create Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Register</button></p>
    <p><button class="google-button" @click="signInWithGoogle">Sign In With Google</button></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
const email = ref('')
const password = ref('')
const router = useRouter()

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      console.log('Success' + user)
      router.push({ path: '/' })
    })
    .catch((error) => {
      const errorMessage = error.message
      console.log('Error' + errorMessage)
    })
}

const signInWithGoogle = () => {
  console.log
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
