<script setup>
import AttractionRecommand from '@/components/Attraction/AttractionRecommand.vue'
import BoardListView from '@/views/board/BoardListView.vue'
</script>

<template>
  <div class="flex -mt-[100px] -mb-[200px] justify-center items-center h-screen max-w-screen">
    <AttractionRecommand />
  </div>
  <div class="mainpageboard">
    <BoardListView />
  </div>
</template>

<style scoped>
.mainpageboard {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
