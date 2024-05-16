<script setup>
import AttractionRecommand from '@/components/Attraction/AttractionRecommand.vue'
import BoardListView from '@/views/board/BoardListView.vue'

import axios from 'axios'

console.log(import.meta.env.VITE_WEATHER_API_KEY)

const getWeather = async () => {
  console.log('날씨')
  //  37.55382466, lon: 127.104871
  await axios
    .get(
      'https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=37.55382466&lon=127.104871&units=metric&lang=kr&appid=' +
        import.meta.env.VITE_WEATHER_API_KEY
    )
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <div class="flex">
    <button class="z-50" @click="getWeather">날씨</button>
  </div>
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
