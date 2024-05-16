<script setup>
import { defineProps, ref } from 'vue'
import { useAttractionInfoStore } from '@/store/attrationStore'
import Score from '../common/Score.vue'
import Wish from '../common/Wish.vue'
import Wished from '../common/Wished.vue'

// import { useRouter } from 'vue-router'
// const router = useRouter()

const infoStore = useAttractionInfoStore()

const props = defineProps({
  attractionItem: {
    type: Object, // 객체(Object) 유형으로 지정
    required: true // 필수 prop으로 지정 (선택적인 경우 필요에 따라 변경)
  }
})

const score = ref(3)

// eslint-disable-next-line vue/no-mutating-props
props.attractionItem.firstImage = props.attractionItem.firstImage || 'src/assets/noImg.png'

infoStore.setItem(props.attractionItem.value)
</script>

<template>
  <div class="p-4 sm:ml-64">
    <RouterLink
      @click="infoStore.setItem(attractionItem)"
      :to="{ name: 'detail' }"
      class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xxl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      style="height: 300px"
    >
      <!-- 이미지 -->
      <img
        :alt="attractionItem.title"
        class="object-cover w-full rounded-t-lg h-full md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        :src="attractionItem.firstImage"
        style="width: 40%; aspect-ratio: 140 / 140; object-fit: cover; height: 100%"
      />

      <div class="flex flex-col justify-between p-8 leading-normal w-120" style="width: 60%">
        <Wish
          class="justify-end"
          :contentId="attractionItem.contentId"
          v-if="!attractionItem.wishlistId"
        />
        <Wished
          class="justify-end"
          :contentId="attractionItem.contentId"
          v-if="attractionItem.wishlistId"
        />

        <h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ attractionItem.title }}
        </h1>

        <!-- 찜 수 -->
        <div class="flex items-center mt-2 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-yellow-400"
          >
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            ></polygon>
          </svg>
          <p class="ml-2">65(찜수)</p>
          <p class="ml-2">조회수: {{ attractionItem.readCount }}</p>
        </div>

        <div class="flex items-center mt-2 mb-4">
          <Score :score="score" />

          <p style="margin-left: 10px">(4.23)평점</p>
        </div>

        <!-- 카테고리 -->
        <span>{{ attractionItem.addr1 }} {{ attractionItem.addr2 }}</span>

        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped></style>
