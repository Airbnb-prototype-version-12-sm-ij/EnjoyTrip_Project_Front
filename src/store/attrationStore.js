import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAttractionStore = defineStore('attraction', () => {
  const attractionItems = ref([])

  const setItems = (items) => {
    attractionItems.value = items
  }
  return { attractionItems, setItems }
})

export const useAttractionInfoStore = defineStore('attractionInfo', () => {
  const attractionInfo = ref({})

  const setItem = (item) => {
    attractionInfo.value = item
  }
  return { attractionInfo, setItem }
})
