<script setup>
import AttractionRecommand from '@/components/Attraction/AttractionRecommand.vue'
import BoardListView from '@/views/board/BoardListView.vue'
</script>

<template>
  <h1 class="ml-12 mt-44 -mb-44 text-center text-4xl font-bold text-blue-500 ml-5">인기 관광지</h1>
  <div class="flex -mt-[50px] -mb-[200px] justify-center items-center h-screen max-w-screen">
    <AttractionRecommand />
  </div>

  <div class="flex-row m-10">
    <h1 class="ml-12 text-center text-4xl font-bold text-blue-500 ml-5">최신 게시물</h1>
    <BoardListView :latest="true" />
  </div>
</template>

<style scoped>
.mainpageboard {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
