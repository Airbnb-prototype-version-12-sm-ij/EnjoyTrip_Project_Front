<script setup>
import { defineProps } from 'vue'

defineProps({
  IMG_SRC: String
})
</script>

<template>
  <img class="w-1/4 rounded-l-md" :src="IMG_SRC" style="aspect-ratio: 1/1; object-fit: cover" />
</template>

<style scoped>
img {
  width: 500px;
  height: 50%;
}
</style>
