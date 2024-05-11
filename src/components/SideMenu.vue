<script setup>
import { ref } from 'vue'

const state = ref({
  hover: Array(7).fill(false),
  links: [
    // 여기에 링크 추가
    '',
    '',
    '',
    '',
    ''
  ]
})
</script>

<template>
  <nav class="col-span-1 space-y-1 w-full pl-3">
    <a
      v-for="(link, index) in state.links"
      :key="index"
      class="block px-4 py-2 text-sm pr-32 text-nowrap"
      :href="link"
      @mouseover="state.hover[index] = true"
      @mouseleave="state.hover[index] = false"
      :class="{ 'bg-gray-200 rounded-md': state.hover[index] }"
    >
      링크 {{ index + 1 }}
    </a>
  </nav>
</template>

<style scoped></style>
