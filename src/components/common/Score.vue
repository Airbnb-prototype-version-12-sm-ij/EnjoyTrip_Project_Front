<script setup>

const props = defineProps({
    score: Number
})


</script>

<template>
    <div class="flex space-x-1">
        <div v-for="i in 5" :key="i" class="w-5 h-5 rounded-full"
            :class="{ 'bg-[#00af87]': i <= score, 'bg-gray-300': i > score }"></div>
    </div>
</template>




<style scoped></style>