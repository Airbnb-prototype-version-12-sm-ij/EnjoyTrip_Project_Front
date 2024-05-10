<script setup>
import { onMounted } from 'vue'
import { useAttractionInfoStore } from '@/store/attrationStore'
import { storeToRefs } from 'pinia'
import SideMenu from '@/components/SideMenu.vue'
import { useRouter } from 'vue-router'
import KakaoMap from '@/components/Attraction/KakaoMap.vue'
import AttractionDetailReviewList from '@/components/attraction_detail/AttractionDetailReviewList.vue'
import PhotoView from '../PhotoView.vue'

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
  {{ attractionInfo }}
  <div class="max-w-7xl mx-auto py-10 flex flex-col">
    <div class="flex container">
      <div class="flex mr-auto">
        <SideMenu />
      </div>
      <div>
        <h1 class="text-3xl font-bold">{{ attractionInfo.title }}</h1>
        <h2 class="text-gray-500">설명</h2>
        <p class="text-gray-500">{{ attractionInfo.overview }}</p>
      </div>
    </div>
    <div class="flex">
      <PhotoView :IMG_SRC="attractionInfo.firstImage" />
      <KakaoMap :lat="attractionInfo.latitude" :lon="attractionInfo.longitude" />
    </div>
    <AttractionDetailReviewList />
  </div>
</template>

<style scoped>
.container {
  max-height: 90vh; /* 뷰포트 높이의 90%를 최대 높이로 설정 */
  overflow: auto;
}
</style>
