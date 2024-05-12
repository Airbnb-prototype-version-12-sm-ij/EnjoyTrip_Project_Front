<script setup>

import client from '@/api/client';
import BoardCommentItem from './BoardCommentItem.vue';
import { ref, onMounted } from 'vue';

const props = defineProps({
    boardId: Number,
    loginUser: String
})


const commentList = ref([]);
const comment = ref('');

const getCommentList = async () => {
    try {
        const response = await client.get('posting/comment/' + props.boardId);
        commentList.value = response.data;
    } catch {
        alert('에러가 발생했습니다.');
    }
}


const postComment = async () => {
    try {
        const response = await client.post('posting/comment/' + props.boardId, {
            postId: props.boardId,
            comment: comment.value,
        });
        console.log(response.data);
        comment.value = '';
        getCommentList();

    } catch {
        alert('에러가 발생했습니다.');
    }
}



onMounted(async () => {
    await getCommentList();

    console.log(commentList.value);
});


</script>

<template>
    <div class="grid gap-6">

        <BoardCommentItem v-for="comment in commentList" :key="comment.commentId" :comment="comment"
            :loginUser='loginUser' />


        <div class="text-sm flex items-start gap-4">
            <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <img class="aspect-square h-full w-full" alt="@shadcn" src="@/assets/sample.png" />
            </span>
            <div class="grid gap-1.5 flex-1">
                <div class="flex items-center gap-2">
                    <div class="font-semibold">{{ loginUser }}</div>
                </div>
                <input type='text' v-model="comment"
                    class="flex min-h-[80px] ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
                    placeholder="댓글을 작성해 주세요!"></input>
                <button @click="postComment"
                    class="inline-flex items-center justify-center rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mr-2">
                    Post
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>