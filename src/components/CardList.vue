<template>
  <div class="card-list">
    <div v-for="item in data" :key="item.id" class="card">
      <h3>{{ item.title }}</h3>
      <p>User ID: {{ item.userId }}</p>
      <p>ID: {{ item.id }}</p>
      <p>Completed: {{ item.completed }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  data: {
    type: Array,
    required: true,
  },
  error: {
    type: String,
    required: false,
  },
})
</script>

<style scoped>
.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  width: 200px;
}
</style>
