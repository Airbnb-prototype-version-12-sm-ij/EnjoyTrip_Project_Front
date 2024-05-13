<script setup>
import { onMounted } from 'vue'
import { useAttractionInfoStore } from '@/store/attrationStore'
import { storeToRefs } from 'pinia'
import SideMenu from '@/components/SideMenu.vue'
import { useRouter } from 'vue-router'
import KakaoMap from '@/components/Attraction/KakaoMap.vue'
import Review from '@/components/Review/Review.vue'
import PhotoView from '@/views/PhotoView.vue'
import Score from '@/components/common/Score.vue'
import contentTypeName from '@/api/contentTypeName'

const router = useRouter()
const attractionInfoStore = useAttractionInfoStore()
const { attractionInfo } = storeToRefs(attractionInfoStore)

onMounted(() => {
  if (!attractionInfo.value.title) {
    router.push('/')
  }
})
</script>

<template>
  <div class="max-w-7xl mx-auto py-10 flex flex-col">
    <div class="flex container">
      <div class="flex mr-auto">
        <!-- <SideMenu /> -->
      </div>
    </div>


    <div class='flex flex-row'>
      <Score :score='3' />
      <p class='ml-3 mb-3'> 1,231건의 리뷰</p>
      <p class='ml-3 mb-3'> {{ contentTypeName[attractionInfo.contentTypeId] }}</p>
      <p class='ml-3 mb-3'> 조회수: {{ attractionInfo.readCount }}</p>
    </div>

    <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xxl 
      dark:border-gray-700 dark:bg-gray-800 ">
      <img class="object-cover w-full rounded-t-lg h-full md:h-auto md:w-auto md:rounded-none md:rounded-s-lg"
        style='width:700px; object-fit: cover; height: 500px' :src="attractionInfo.firstImage" alt="">
      <div class="flex flex-col justify-between p-4 leading-normal h-[30rem]">
        <h5 class="mb-4 mt-5 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{{ attractionInfo.title }}
        </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ attractionInfo.overview }}</p>

      </div>
    </div>





    <div class="flex">
      <KakaoMap :lat="attractionInfo.latitude" :lon="attractionInfo.longitude" />
    </div>
    <Review />
  </div>
</template>

<style scoped>
.container {
  max-height: 90vh;
  /* 뷰포트 높이의 90%를 최대 높이로 설정 */
  overflow: auto;
}
</style>
