<script setup>
import { ref, onMounted } from 'vue'
import ReviewListItem from './ReviewListItem.vue'
import client from '@/api/client'

import { storeToRefs } from 'pinia'
import { useAttractionInfoStore } from '@/store/attrationStore'
const attractionInfoStore = useAttractionInfoStore()

const { attractionInfo } = storeToRefs(attractionInfoStore)

const datas = ref([])

const getReviewList = () => {
  client
    .get('/review/' + attractionInfo.value.contentId)
    .then((response) => {
      console.log(response.data)
      datas.value = response.data
    })
    .catch(() => {
      alert('에러가 발생했습니다.')
    })
}

onMounted(() => {
  getReviewList()
})

// for (let i = 0; i < 5; i++) {
//   datas.value.push({
//     userName: '황성민',
//     reviewTitle: '리뷰제목입니다.',
//     reviewContent: '리뷰 내용입니다! 리뷰 내용입니다! 리뷰 내용입니다! 리뷰 내용입니다! 리뷰 내용입니다!',
//     reviewDate: '2024년 4월',
//     reviewScore: 2.3,
//   })
// }
</script>

<template>
  <ReviewListItem v-for="(data, index) in datas" :key="index" :data="data" />
</template>

<style scoped></style>
