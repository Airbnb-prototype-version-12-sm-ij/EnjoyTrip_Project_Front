<script setup>
const props = defineProps({
  lat: Number,
  lon: Number
})

console.log(props.lat, props.lon)
</script>

<template>
  <div>
    <h1>카카오맵</h1>
  </div>
</template>

<style scoped></style>
