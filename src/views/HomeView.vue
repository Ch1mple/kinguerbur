<script setup>
import CardList from '../components/CardList.vue'
import CardFilter from '../components/CardFilter.vue'
import { ref, onMounted, computed } from 'vue'
import { getCards } from '../services/apiService.js'

const data = ref([])
const error = ref(null)
const isLoading = ref(true)
const itemsToShow = ref(10)
const filters = ref({
  name: '',
  type: '',
  rarity: ''
})

const loadMore = () => {
  itemsToShow.value += 10
}

const filteredData = computed(() => {
  return data.value.filter(item => {
    return (
      (!filters.value.name || item.name.toLowerCase().includes(filters.value.name.toLowerCase())) &&
      (!filters.value.type || item.type === filters.value.type) &&
      (!filters.value.rarity || item.rarity === filters.value.rarity)
    )
  })
})

onMounted(async () => {
  try {
    data.value = await getCards()
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
    <CardFilter @update:filters="filters = $event" />
    <CardList v-if="!isLoading" :data="filteredData.slice(0, itemsToShow)" :error="error" />
    <p v-else>Cargando...</p>
    <button class="loadMore" v-if="itemsToShow < filteredData.length" @click="loadMore">Cargar más</button>
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
