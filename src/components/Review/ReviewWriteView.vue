<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const reviewScore = ref(0)

watchEffect(() => {
  const score = route.params.reviewScore
  reviewScore.value = isNaN(score) ? 0 : score
})

import ReviewWriteAside from '@/components/Review/ReviewWriteForm.vue'
import ReviewWriteAttraction from '@/components/Review/ReviewWriteAttraction.vue'
</script>




<template>
  <div class="container mx-auto px-4 mt-[180px]">
    <main class="flex mt-8">
      <ReviewWriteAttraction :reviewScore='reviewScore' />
      <ReviewWriteAside />
    </main>
  </div>
</template>

<style scoped></style>
