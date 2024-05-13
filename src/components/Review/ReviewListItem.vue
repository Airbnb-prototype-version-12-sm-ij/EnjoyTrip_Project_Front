<script setup>

import { ref } from 'vue';
import Score from '@/components/common/Score.vue';

const props = defineProps({
  data: Object
})

</script>

<template>
  <div class="space-y-6 p-2 border rounded-xl">
    <div class="flex items-center">
      <!-- 유저 샘플 이미지 -->
      <img class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full mr-4" src="@/assets/sample.png" />
      <div class="flex-grow">
        <p class="font-semibold">{{ data.userName }}</p>
        <div>
          <Score :score="data.reviewScore" />
        </div>
      </div>
      <div class="flex-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="w-6 h-6 text-gray-500">
          <circle cx="12.1" cy="12.1" r="1"></circle>
        </svg>
      </div>
    </div>
    <div class="flex items-center">
      <img alt="Review Image" class="mr-4 rounded-md" height="100" src="@/assets/boardSample.jpg"
        style="aspect-ratio: 100/100; object-fit: cover" width="100" />

      <div class="flex-grow">
        <p class="text-lg">
          {{ data.reviewTitle }}
        </p>
        <p class="text-sm- mt-1">
          {{ data.reviewDate }}
        </p>
        <p class="text-sm- mt-2">
          {{ data.reviewContent }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>