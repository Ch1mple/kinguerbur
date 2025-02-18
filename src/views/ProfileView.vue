<template>
  <div class="profile">
    <h1>This is the profile page of {{ userId }}</h1>
    <div>
      <button @click="activeTab = 'sent'">Sent Trades</button>
      <button @click="activeTab = 'received'">Received Trades</button>
    </div>
    <div v-if="activeTab === 'sent'">
      <h2>Sent Trades</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Receiver ID</th>
            <th>Card IDs</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="trade in sentTrades" :key="trade.trade_id">
            <td>{{ trade.trade_id }}</td>
            <td>{{ trade.receiver_id }}</td>
            <td>{{ trade.card_ids.join(', ') }}</td>
            <td>{{ trade.status }}</td>
            <td>{{ new Date(trade.created_at).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="activeTab === 'received'">
      <h2>Received Trades</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sender ID</th>
            <th>Card IDs</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="trade in receivedTrades" :key="trade.trade_id">
            <td>{{ trade.trade_id }}</td>
            <td>{{ trade.sender_id }}</td>
            <td>{{ trade.card_ids.join(', ') }}</td>
            <td>{{ trade.status }}</td>
            <td>{{ new Date(trade.created_at).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onAuthStateChange } from '../services/authService.js'
import { getSentTrades, getReceivedTrades } from '../services/apiService.js'

const userId = ref('')
const activeTab = ref('sent')
const sentTrades = ref([])
const receivedTrades = ref([])

onMounted(() => {
  onAuthStateChange(async (user) => {
    if (user) {
      userId.value = user.uid
      try {
        sentTrades.value = await getSentTrades(user.uid)
        receivedTrades.value = await getReceivedTrades(user.uid)
      } catch (error) {
        console.error('Error fetching trades:', error)
      }
    } else {
      userId.value = ''
    }
  })
})
</script>

<style>
@media (min-width: 1024px) {
  .profile {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

button {
  margin: 10px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #366b72;
  text-align: left;
}
</style>
