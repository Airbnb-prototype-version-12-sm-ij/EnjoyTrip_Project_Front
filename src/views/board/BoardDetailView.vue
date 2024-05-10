<script setup>

import BoardDetail from '@/components/board/BoardDetail.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const board = JSON.parse(route.query.board);
</script>




<template>
    <div>
        <BoardDetail :board='board' />
    </div>
</template>

<style scoped></style>