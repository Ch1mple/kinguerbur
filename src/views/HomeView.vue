<script setup>
import CardList from '../components/CardList.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const data = ref([])
const error = ref(null)
const isLoading = ref(true)
const itemsToShow = ref(10)

const loadMore = () => {
  itemsToShow.value += 10
}

onMounted(async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
    data.value = response.data
    console.log(data.value)
  } catch (err) {
    error.value = err.message
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <main>
    <CardList v-if="!isLoading" :data="data.slice(0, itemsToShow)" :error="error" />
    <p v-else>Cargando...</p>
    <button class="loadMore" v-if="itemsToShow < data.length" @click="loadMore">Cargar más</button>
  </main>
</template>

<style>
.loadMore {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
