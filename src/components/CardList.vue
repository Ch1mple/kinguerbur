<template>
  <div class="card-list">
    <div v-for="item in data" :key="item.id" class="card">
      <img :src="item.img_url" alt="Card image" class="card-image" />
      <h3>{{ item.name }}</h3>
      <p>Type: {{ item.type }}</p>
      <p>Rarity: {{ item.rarity }}</p>
      <p>Expansion: {{ item.expansion }}</p>
      <p>Year: {{ item.year }}</p>
      <p>Status: {{ item.status }}</p>
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
  justify-content: center;
  margin-top: 20px;
}

.card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  width: 200px;
  text-align: center;
}

.card-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>
