<script setup>
import SideMenu from '../components/SideMenu.vue'
import AttractionList from '../components/AttractionList.vue'
</script>

<template>
  <div class="max-w-7xl mx-auto py-10">
    <div class="grid grid-cols-4 gap-8">
      <SideMenu />
      <AttractionList />
    </div>
  </div>
</template>

<style scoped></style>
