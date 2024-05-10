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
  <div class="max-w-7xl mx-auto py-10 flex flex-col">
    <div class="flex">
      <div class="flex mr-auto">
        <SideMenu />
      </div>
      <div class="flex">
        <PhotoView :IMG_SRC="attractionInfo.firstImage" />
      </div>
      <div class="flex ml-auto">
        <KakaoMap :lat="attractionInfo.latitude" :lon="attractionInfo.longitude" />
      </div>
    </div>
    <AttractionDetailReviewList />
  </div>
</template>

<style scoped></style>
