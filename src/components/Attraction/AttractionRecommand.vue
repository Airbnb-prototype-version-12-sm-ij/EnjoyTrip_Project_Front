<script setup>
import { ref } from 'vue'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
const state = ref({
  recommendedPlaces: [
    { name: '서울', image: 'src/assets/bangbang_goggog_logo_1.svg' },
    { name: '부산', image: 'src/assets/bangbang_goggog_logo_1.svg' },
    { name: '제주', image: 'src/assets/bangbang_goggog_logo_1.svg' },
    { name: '경주', image: 'src/assets/bangbang_goggog_logo_1.svg' },
    { name: '강릉', image: 'src/assets/bangbang_goggog_logo_1.svg' }
  ]
})
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">추천 관광지</h1>
      <Carousel
        class="w-64"
        :autoplay="2500"
        :transition="1000"
        :wrap-around="true"
        :items-to-show="1"
      >
        <Slide v-for="(place, index) in state.recommendedPlaces" :key="index">
          <div class="w-full bg-white shadow rounded p-4" style="aspect-ratio: 1/1">
            <img
              :src="place.image"
              :alt="place.name"
              class="w-full h-32 object-cover rounded mb-2"
            />
            <h2 class="text-2xl font-bold mb-2">{{ place.name }}</h2>
            <p>여기는 {{ place.name }}입니다.</p>
          </div>
        </Slide>
        <template #addons>
          <navigation />
          <pagination />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<style scoped>
.carousel-container .carousel__navigation--next,
.carousel-container .carousel__navigation--prev {
  background-color: black;
  color: white;
}

.carousel-container .carousel__navigation--next:hover,
.carousel-container .carousel__navigation--prev:hover {
  background-color: gray;
}
</style>
