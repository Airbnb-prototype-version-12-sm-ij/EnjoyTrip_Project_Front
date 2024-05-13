<script setup>

import { ref } from 'vue'
import ReviewListItem from './ReviewListItem.vue';

const datas = ref([])

for (let i = 0; i < 5; i++) {
  datas.value.push({
    userName: '황성민',
    reviewTitle: '리뷰제목입니다.',
    reviewContent: '리뷰 내용입니다! 리뷰 내용입니다! 리뷰 내용입니다! 리뷰 내용입니다! 리뷰 내용입니다!',
    reviewDate: '2024년 4월',
    reviewScore: 2.3,
  })
}


</script>

<template>
  <ReviewListItem v-for="(data, index) in datas" :key="index" :data="data" />
</template>

<style scoped></style>