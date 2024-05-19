<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const props = defineProps({
  lat: {
    type: Number,
    required: true
  },
  lon: {
    type: Number,
    required: true
  }
})

const lat = props.lat
const lon = props.lon

const weather = ref('')
const temp = ref('')

const iconURL = ref('')

const getWeather = async () => {
  console.log('날씨')
  console.log(lat, lon)
  await axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    )
    .then((response) => {
      weather.value = response.data.weather[0].description
      temp.value = response.data.main.temp

      const icon = response.data.weather[0].icon
      iconURL.value = `http://openweathermap.org/img/wn/${icon}@2x.png`
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(async () => {
  await getWeather()
})
</script>

<template>
  <div class="flex z-50 justify-end items-center">
    {{ weather }}
    {{ temp }}
    <img :src="iconURL" width="50px" />
  </div>
</template>

<style scoped></style>
