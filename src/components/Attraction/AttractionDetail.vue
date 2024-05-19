<script setup>
import Wish from '@/components/common/Wish.vue'
import Wished from '../common/Wished.vue'
import { onMounted, computed } from 'vue'
import { useAttractionInfoStore } from '@/store/attrationStore'
import { storeToRefs } from 'pinia'
import getWeagtherInfo from '@/components/getWeatherInfo.vue'
import { useRouter } from 'vue-router'
import KakaoMap from '@/components/Attraction/KakaoMap.vue'
import Review from '@/components/Review/Review.vue'

import Score from '@/components/common/Score.vue'
import contentTypeName from '@/api/contentTypeName'
import client from '@/api/client'

const userInfo = computed(() => {
  const memberDto = sessionStorage.getItem('memberDto')
  return memberDto ? JSON.parse(memberDto) : null
})

const router = useRouter()
const attractionInfoStore = useAttractionInfoStore()
const { attractionInfo } = storeToRefs(attractionInfoStore)

const instagram = 'https://www.instagram.com/explore/tags/' + attractionInfo.value.title

const lat = attractionInfo.value.latitude
const lon = attractionInfo.value.longitude


onMounted(() => {

  attractionInfo.value.readCount++;
  client.post(`/attractions/addViewCount/${attractionInfo.value.contentId}`)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });

  if (!attractionInfo.value.title) {
    router.push('/')
  }


})
</script>

<template>
  <div class="max-w-7xl mx-auto py-10 flex flex-col mt-20">
    <!-- <div class="flex container">
      <div class="flex mr-auto">
        <SideMenu />
      </div>
    </div> -->


    <div class='flex justify-between'>
      <div class="flex py-3 text-lg">

        <Score :score="attractionInfo.rating && attractionInfo.rating.length > 0
          ? attractionInfo.rating.reduce((a, b, i) => a + b * (i + 1), 0) / attractionInfo.rating.reduce((a, b) => a + b, 0)
          : 0" />
        <p class="ml-5">{{ attractionInfo.rating ? attractionInfo.rating.reduce((a, b) => a + b, 0) : 0 }} 건의 리뷰</p>
        <p class="ml-5">{{ contentTypeName[attractionInfo.contentTypeId] }}</p>
        <p class="ml-5">조회수: {{ attractionInfo.readCount }}</p>

      </div>

      <div class='pb-4'>
        <button type="button" @click="router.go(-1)"
          class="flex whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-gray-300 hover:text-accent-foreground h-10 px-4 py-2">뒤로가기</button>
      </div>
    </div>
    <!-- 관광지 정보 -->
    <div
      class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xxl dark:border-gray-700 dark:bg-gray-800 max-w-screen">
      <!-- 관광지 이미지 -->
      <img
        class="object-cover w-full rounded-t-lg h-full max-w-full max-h-full md:h-auto md:w-auto md:rounded-none md:rounded-s-lg"
        style="width: 50%; object-fit: cover; height: 500px" :src="attractionInfo.firstImage" alt="" />

      <!-- 관광지 제목 및 설명 -->
      <div class="flex flex-col justify-between p-4 leading-normal h-[30rem]" style="width: 50%">
        <div class="flex justify-between">
          <h5 class="mb-4 mt-5 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {{ attractionInfo.title }}
          </h5>
          <Wish :contentId="attractionInfo.contentId" v-if="!attractionInfo.wishlistId && userInfo" />
          <Wished :contentId="attractionInfo.contentId" v-if="attractionInfo.wishlistId && userInfo" />
        </div>
        <!-- 인스타 태그 검색 -->
        <a :href="instagram" target="_blank" class="flex max-w-[31px]">
          <img alt="인스타그램 태그 검색" src="../../assets/pngwing.com.png" style="width: 30px" />
        </a>
        <getWeagtherInfo :lat="lat" :lon="lon" />
        <p class="scrollBar overflow-auto mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ attractionInfo.overview }}
        </p>
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
