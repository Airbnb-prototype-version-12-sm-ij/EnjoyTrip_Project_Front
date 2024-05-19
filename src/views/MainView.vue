<script setup>
import AttractionRecommand from '@/components/Attraction/AttractionRecommand.vue'
import BoardListView from '@/views/board/BoardListView.vue'
import getWeagtherInfo from '@/components/getWeatherInfo.vue'
</script>

<template>
  <getWeagtherInfo />
  <div class="flex -mt-[50px] -mb-[200px] justify-center items-center h-screen max-w-screen">
    <AttractionRecommand />
  </div>

  <div class="flex-row m-10">
    <h1 class="ml-12 text-start text-4xl font-bold text-blue-500 ml-5">최신 게시물</h1>
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
