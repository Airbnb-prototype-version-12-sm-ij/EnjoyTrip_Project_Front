<script setup>
import { ref, onMounted } from 'vue'
import ReviewListItem from './ReviewListItem.vue'
import client from '@/api/client'

import { storeToRefs } from 'pinia'
import { useAttractionInfoStore } from '@/store/attrationStore'
const attractionInfoStore = useAttractionInfoStore()
const { attractionInfo } = storeToRefs(attractionInfoStore)

const datas = ref([])

const getReviewList = async () => {
  await client
    .get('/review/' + attractionInfo.value.contentId)
    .then((response) => {
      console.log(response.data)
      datas.value = response.data
    })
    .catch(() => {
      alert('에러가 발생했습니다.')
    })
}

const ratings = ref([0, 0, 0, 0, 0]);
onMounted(async () => {
  await getReviewList()
  for (let data of datas.value) {
    ratings.value[data.rating - 1] += 1;
  }

  attractionInfo.value.rating = ratings;
})



</script>

<template>
  <ReviewListItem v-for="(data, index) in datas" :key="index" :data="data" />
</template>

<style scoped></style>
