<script setup>
import { ref } from 'vue'
import UserRegister from '../components/UserRegister.vue'
import SignIn from '@/components/SignIn.vue'

const showRegister = ref(false)

function toggleView() {
  showRegister.value = !showRegister.value
}
</script>
<template>
  <div>
    <div v-if="showRegister" class="register">
      <UserRegister />
      <button @click="toggleView">Back to Sign In</button>
    </div>
    <div v-else class="signin">
      <SignIn />
      <button @click="toggleView">Go to Register</button>
    </div>
  </div>
</template>
