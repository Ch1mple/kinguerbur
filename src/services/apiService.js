import axios from 'axios'
import { API_BASE_URL } from '../config.js'

export const getCards = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cards`)
    return response.data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getNameSuggestions = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/names`, {
      params: { query }
    })
    return response.data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getTrades = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/trades/${id}`)
    return response.data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getSentTrades = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/trades/sent/${userId}`)
    return response.data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getReceivedTrades = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/trades/received/${userId}`)
    return response.data
  } catch (error) {
    throw new Error(error.message)
  }
}
