<script setup>

const props = defineProps(
  {
    reviewScoreCount: {
      type: Array,
      required: true
    }
  }
)


const showScoreCount = [0, 0, 0, 0, 0]

for (let i = 0; i < props.reviewScoreCount.length; i++) {
  showScoreCount[4 - i] = props.reviewScoreCount[i]
}


const evals = ['훌륭함', '매우 좋음', '보통', '형편 없음', '최악'];
const sum = showScoreCount.reduce((acc, cur) => acc + cur, 0)


</script>

<template>
  <div class="flex justify-between items-center" v-for="index in 5" :key="index">
    <p class='w-3/12'>{{ evals[index - 1] }}</p>
    <div class="w-7/12 bg-gray-200 rounded-full h-2.5 mb-1 dark:bg-gray-200">
      <div class="bg-green-600 h-2.5 rounded-full dark:bg-green-500"
        :style="{ width: (showScoreCount[index - 1] / sum) * 100 + '%' }"></div>
    </div>
    <p class="pb-1">{{ showScoreCount[index - 1] }}</p>
  </div>
</template>

<style scoped></style>