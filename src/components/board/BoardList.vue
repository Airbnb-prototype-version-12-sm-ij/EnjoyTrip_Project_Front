<script setup>

import BoardListItem from '@/components/board/BoardListItem.vue';
import axios from 'axios';

import { ref, onMounted } from 'vue';



const boardList = ref([]);

const getBoardList = () => {
    axios.get('http://localhost/posting/')
        .then((response) => {
            console.log(response.data);
            boardList.value = response.data;
        })
        .catch(() => {
            alert('에러가 발생했습니다.');
        });
}


onMounted(() => {
    getBoardList();
});

</script>

<template>

    <button @click='$router.push({ name: "boardWrite" })'
        class="ml-20 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 border rounded-lg">
        글쓰기
    </button>
    <section class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-4 md:p-6 mx-2 md:mx-6">
        <BoardListItem v-for="(board) in boardList" :key="board.postId" :board='board' />
    </section>
</template>

<style scoped></style>