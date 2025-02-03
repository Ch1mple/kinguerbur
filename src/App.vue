<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import router from './router'

const isLogged = ref(false)
const userEmail = ref('')
const auth = getAuth()

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLogged.value = true
      userEmail.value = user.email
    } else {
      isLogged.value = false
      userEmail.value = ''
    }
  })
})

const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      console.log('Sign-out successful.')
      isLogged.value = false
      userEmail.value = ''
      router.push('/login')
    })
    .catch((error) => {
      console.error('Sign-out error:', error)
    })
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/login" v-if="!isLogged">Login</RouterLink>
        <span v-if="isLogged">Hello, {{ userEmail }}</span>
        <button @click="handleSignOut" v-if="isLogged">Sign Out</button>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
/* Agrega estilos aquí si es necesario */
</style>
