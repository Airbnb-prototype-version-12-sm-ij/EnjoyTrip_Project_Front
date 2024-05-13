<script setup>

import { ref, onMounted } from 'vue'
import ReviewListItem from './ReviewListItem.vue';
import axios from 'axios';

import { storeToRefs } from 'pinia'
import { useAttractionInfoStore } from '@/store/attrationStore'
const attractionInfoStore = useAttractionInfoStore()

const { attractionInfo } = storeToRefs(attractionInfoStore)


const datas = ref([])


const getReviewList = () => {
  axios.get('http://localhost/review/' + attractionInfo.value.contentId)
    .then((response) => {
      datas.value = response.data;
    })
    .catch(() => {
      alert('에러가 발생했습니다.');
    });
}


onMounted(() => {
  getReviewList();
});



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