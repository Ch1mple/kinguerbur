<template>
  <div class="card-filter">
    <input v-model="filters.name" type="text" placeholder="Search by name" @input="updateSuggestions" />
    <ul v-if="nameSuggestions.length" class="suggestions">
      <li v-for="suggestion in nameSuggestions" :key="suggestion" @click="selectSuggestion(suggestion)">
        {{ suggestion }}
      </li>
    </ul>
    <select v-model="filters.type">
      <option value="">All Types</option>
      <option value="fire">Fire</option>
      <option value="water">Water</option>
      <!-- Add more options as needed -->
    </select>
    <select v-model="filters.rarity">
      <option value="">All Rarities</option>
      <option value="common">Common</option>
      <option value="rare">Rare</option>
      <!-- Add more options as needed -->
    </select>
    <button @click="applyFilters">Apply Filters</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from '../config.js'

const filters = ref({
  name: '',
  type: '',
  rarity: ''
})

const nameSuggestions = ref([])

const emit = defineEmits(['update:filters'])

const applyFilters = () => {
  emit('update:filters', { ...filters.value })
}

const updateSuggestions = async () => {
  if (filters.value.name) {
    try {
      const response = await axios.get(`${API_BASE_URL}/names`, {
        params: { query: filters.value.name }
      })
      const suggestions = response.data
      nameSuggestions.value = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(filters.value.name.toLowerCase())
      )
    } catch (error) {
      console.error('Error fetching name suggestions:', error)
    }
  } else {
    nameSuggestions.value = []
  }
}

const selectSuggestion = (suggestion) => {
  filters.value.name = suggestion
  nameSuggestions.value = []
}

watch(filters, (newFilters) => {
  if (!newFilters.name) {
    nameSuggestions.value = []
  }
})
</script>

<style scoped>
.card-filter {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.card-filter input,
.card-filter select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.card-filter button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.suggestions {
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
}

.suggestions li {
  padding: 0.5rem;
  cursor: pointer;
}

.suggestions li:hover {
  background-color: #f0f0f0;
}
</style>
