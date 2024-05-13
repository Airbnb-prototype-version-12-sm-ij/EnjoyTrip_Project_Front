<script setup>
import { ref } from 'vue'
const score = ref(3.2)


import { storeToRefs } from 'pinia'

import { useAttractionInfoStore } from '@/store/attrationStore'
const attractionInfoStore = useAttractionInfoStore()

const { attractionInfo } = storeToRefs(attractionInfoStore)



</script>

<template>
  <section class="w-2/5 pr-8 space-y-4 ml-40">
    <h1 class="text-3xl font-bold mb-4">방문하신 시설은 만족스러우셨나요?</h1>
    <div class="flex items-center space-x-6">
      <img alt="Place" class="border rounded-lg" height="300" :src="attractionInfo.firstImage" width="300"
        style="aspect-ratio: 300 / 300; object-fit: cover" />
      <div>
        <!-- 장소이름  -->
        <h2 class="text-2xl font-bold">{{ attractionInfo.title }}</h2>
        <!-- 장소 주소  -->
        <p v-if="attractionInfo.addr1" class="text-sm text-gray-500">{{ attractionInfo.addr1 }} </p>
        <p v-if="attractionInfo.addr2" class="text-sm text-gray-500">{{ attractionInfo.addr2 }}</p>
        <p v-if="attractionInfo.zipcode" class="text-sm text-gray-500">우편 번호: {{ attractionInfo.zipcode }}</p>
        <p v-if="attractionInfo.tel" class="text-sm text-gray-500">전화 번호: {{ attractionInfo.tel }}</p>
        <div class="mt-4 flex items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            :class="{ 'h-5 w-5 fill-yellow-500': score >= 1, 'h-5 w-5 fill-gray-300': score < 1 }">
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
            </polygon>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            :class="{ 'h-5 w-5 fill-yellow-500': score >= 2, 'h-5 w-5 fill-gray-300': score < 2 }">
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
            </polygon>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            :class="{ 'h-5 w-5 fill-yellow-500': score >= 3, 'h-5 w-5 fill-gray-300': score < 3 }">
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
            </polygon>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            :class="{ 'h-5 w-5 fill-yellow-500': score >= 4, 'h-5 w-5 fill-gray-300': score < 4 }">
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
            </polygon>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            :class="{ 'h-5 w-5 fill-yellow-500': score >= 5, 'h-5 w-5 fill-gray-300': score < 5 }">
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
            </polygon>
          </svg>
          <span class="text-sm text-gray-500">({{ score }})</span>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped></style>
