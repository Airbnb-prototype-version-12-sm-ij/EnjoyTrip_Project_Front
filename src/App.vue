<script setup>
import HeaderView from './views/HeaderView.vue'
import PrelineTest from '@/views/PrelineTest.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <PrelineTest />
    <HeaderView />
    <RouterView />
  </div>
</template>

<style scoped></style>
