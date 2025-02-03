<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import router from './router'

const isLogged = ref(false)
const userEmail = ref('')
const auth = getAuth()
let isOpen = ref(false)

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
document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleClickOutside = (event) => {
  const menu = document.querySelector('.menu')
  if (menu && !menu.contains(event.target)) {
    isOpen.value = false
  }
}

const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      console.log('Sign-out successful.')
      isLogged.value = false
      userEmail.value = ''
      router.push('/login')
      closeMenu()
    })
    .catch((error) => {
      console.error('Sign-out error:', error)
    })
}

const closeMenu = () => {
  isOpen.value = false
}

</script>

<template>
  <header>
    <div :class="['wrapper', { 'not-logged': !isLogged }]">
      <span class="hello-user" v-if="isLogged">Hello, {{ userEmail }}</span>
      <div>
        <button @click="isOpen = !isOpen" class="menu">Menu
          <span v-if="isOpen">🔽</span>
          <span v-else>🔼</span>
        </button>


        <nav v-if="isOpen">
          <RouterLink to="/" @click="closeMenu">Home</RouterLink>
          <RouterLink to="/about" @click="closeMenu">About</RouterLink>
          <RouterLink to="/login" v-if="!isLogged" @click="closeMenu">Login</RouterLink>

          <button class="btn-cl-se" @click="handleSignOut" v-if="isLogged">Sign Out</button>
        </nav>
      </div>

    </div>
  </header>

  <RouterView />
</template>

<style scoped>
/* Agrega estilos aquí si es necesario */
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #333;
  color: white;
}

.wrapper.not-logged {
  justify-content: flex-end;
}

.hello-user {
  margin-right: 20px;
}

button {
  background-color: #444;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}

nav {
  display: flex;
  flex-direction: column;
  background-color: #444;
  padding: 10px;
  position: absolute;
  top: 50px;
  right: 10px;
  border-radius: 5px;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 5px 0;
}

nav a:hover {
  text-decoration: underline;
}

.btn-cl-se {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
}

.btn-cl-se:hover {
  background-color: #ff1a1a;
}
</style>
