<script setup>

import BoardListItem from '@/components/board/BoardListItem.vue';
import axios from 'axios';

import { ref, onMounted } from 'vue';



const boardList = ref([]);

const getBoardList = () => {
    axios.get('http://localhost/posting/')
        .then((response) => {
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
    <section class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-4 md:p-6 mx-2 md:mx-6">
        <BoardListItem v-for="(board) in boardList" :key="board.postId" :board='board' />
    </section>
    <div data-dial-init class="fixed bottom-6 right-10 group">
        <button @click='$router.push({ name: "boardWrite" })' aria-controls="speed-dial-menu-dropdown-alternative"
            aria-expanded="false"
            class="flex items-center justify-center ml-auto text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
            <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 20">
                <path
                    d="m13.835 7.578-.005.007-7.137 7.137 2.139 2.138 7.143-7.142-2.14-2.14Zm-10.696 3.59 2.139 2.14 7.138-7.137.007-.005-2.141-2.141-7.143 7.143Zm1.433 4.261L2 12.852.051 18.684a1 1 0 0 0 1.265 1.264L7.147 18l-2.575-2.571Zm14.249-14.25a4.03 4.03 0 0 0-5.693 0L11.7 2.611 17.389 8.3l1.432-1.432a4.029 4.029 0 0 0 0-5.689Z" />
            </svg>
        </button>
    </div>
</template>

<style scoped></style>