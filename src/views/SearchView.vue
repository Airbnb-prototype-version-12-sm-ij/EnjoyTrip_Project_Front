<script setup>
import SideMenu from '../components/SideMenu.vue'
import AttractionList from '../components/Attraction/AttractionList.vue'
import { useAttractionStore } from '@/store/attrationStore'
import { storeToRefs } from 'pinia'

const attractionStore = useAttractionStore()
const { attractionItems } = storeToRefs(attractionStore)
</script>

<template>
  <div class="max-w-7xl mx-auto py-10">
    <div class="grid grid-cols-4 gap-8">
      <SideMenu />
      <AttractionList :attractionItems="attractionItems" />
    </div>
  </div>
</template>

<style scoped></style>
