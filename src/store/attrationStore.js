import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAttractionStore = defineStore('attraction', () => {
  const attractionItems = ref([])

  const setItems = (items) => {
    attractionItems.value = items
  }

  return { attractionItems, setItems }
})
