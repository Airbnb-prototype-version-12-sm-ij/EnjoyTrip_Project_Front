<script setup>
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps'
import { defineProps, ref } from 'vue'
const props = defineProps({
  lat: Number,
  lon: Number
})

const lat = ref(props.lat)
const lng = ref(props.lon)

console.log(lat.value, lng.value)
</script>

<template>
  <KakaoMap :lat="lat" :lng="lng" :draggable="true" width="80rem" height='30rem' level=2>
    <KakaoMapMarker :lat="lat" :lng="lng"></KakaoMapMarker>
  </KakaoMap>
</template>

<style scoped></style>
