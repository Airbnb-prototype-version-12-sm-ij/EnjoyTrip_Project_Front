<script setup>
import HeaderView from './views/HeaderView.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="dark:bg-gray-500">
    <HeaderView />
    <RouterView />
  </div>
</template>

<style scoped></style>
