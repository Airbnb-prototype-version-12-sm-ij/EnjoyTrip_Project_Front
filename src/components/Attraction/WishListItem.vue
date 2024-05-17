<script setup>
import { defineProps, ref } from 'vue'
// import { useAttractionInfoStore } from '@/store/attrationStore'
// import Score from '../common/Score.vue'
// import Wish from '../common/Wish.vue'
// import Wished from '../common/Wished.vue'

// import regionData from '@/api/regionData.js'

const props = defineProps({
  wish: Object
})

const noImg = '/src/assets/noImg.png'
</script>

<template>
  <div class="p-1 sm:ml-64">
    <div
      class="flex flex-col items-center bg-white min-w-[500px] border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      style="height: 200px"
    >
      <!-- 이미지 -->
      <img
        :alt="wish.title"
        class="object-cover w-full rounded-t-lg h-full md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        :src="wish.first_image || noImg"
        style="width: 40%; aspect-ratio: 140 / 140; object-fit: cover; height: 100%"
      />

      <div class="flex flex-col justify-between p-8 leading-normal w-120" style="width: 60%">
        <h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ wish.title }}
        </h1>

        <!-- 찜 수 -->
        <div class="flex items-center mt-2 mb-4"></div>

        <!-- 카테고리 -->
        <span>주소 : {{ wish.addr1 }} {{ wish.addr2 }}</span>
        <span v-if="wish.zip">우편 번호 : {{ wish.zip }}</span>
        <span v-if="wish.tel">전화 번호 : {{ wish.tel }}</span>
        <span v-if="wish.homepage">홈페이지 : {{ wish.homepage }}</span>

        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
