<script setup>
import { defineProps, ref } from 'vue'
import { useAttractionInfoStore } from '@/store/attrationStore'

const { setItem } = useAttractionInfoStore()

const props = defineProps({
  attractionItem: Object
})

const SRC_IMG = props.attractionItem.firstImage
  ? props.attractionItem.firstImage
  : 'src/assets/noImg.png'

const attractionInfo = ref({
  contentId: props.attractionItem.contentId,
  contentTypeId: props.attractionItem.contentTypeId,
  title: props.attractionItem.title,
  addr1: props.attractionItem.addr1,
  addr2: props.attractionItem.addr2,
  zipcode: props.attractionItem.zipcode,
  tel: props.attractionItem.tel,
  firstImage: SRC_IMG,
  firstImage2: props.attractionItem.firstImage2,
  readCount: props.attractionItem.readCount,
  sidoCode: props.attractionItem.sidoCode,
  gugunCode: props.attractionItem.gugunCode,
  latitude: props.attractionItem.latitude,
  longitude: props.attractionItem.longitude,
  mlevel: props.attractionItem.mlevel,
  overview: props.attractionItem.overview
})

setItem(attractionInfo.value)
</script>

<template>
  <RouterLink @click="setItem(attractionInfo)" :to="{ name: 'detail' }"
    class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xxl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    style='height:300px'>
    <!-- 이미지 -->
    <img :alt="attractionItem.title"
      class="object-cover w-full rounded-t-lg h-full md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" :src="SRC_IMG"
      style="width:40%; aspect-ratio: 140 / 140; object-fit: cover; height: 100% " />

    <div class=" flex flex-col justify-between p-4 leading-normal">


      <h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ attractionItem.title }}</h1>
      <div class="flex items-center mt-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-400">
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
          </polygon>
        </svg>
        <!-- 찜 수 -->
        <span class="ml-2">65</span>
        <span class="mx-2">|</span>
        <!-- 카테고리 -->
        <span>{{ attractionItem.addr1 }} | {{ attractionItem.addr2 }}</span>
      </div>

      <!-- 설명 -->
      <p class="text-sm">
        {{ attractionItem.overview }}
      </p>

      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
    </div>

  </RouterLink>
</template>

<style scoped></style>
