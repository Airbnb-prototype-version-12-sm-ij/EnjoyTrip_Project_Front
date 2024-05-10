<script setup>

defineProps({
    board: Object
});


const userId = JSON.parse(sessionStorage.getItem('memberDto')).userId;

</script>

<template>
    <div class="grid gap-8 max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid gap-2">
            <h1 class="text-3xl font-bold">{{ board.title }}</h1>
            <div class="flex justify-between items-center gap-4 text-sm text-gray-500">

                <div class="flex items-center gap-4">
                    <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <img class="aspect-square h-full w-full" alt="@shadcn" src="@/assets/sample.png" />
                    </span>
                    <div>
                        <div class="font-medium">{{ board.userId }}</div>
                        <div>{{ board.createdAt }}</div>
                    </div>
                </div>


                <div v-show="userId == board.userId">
                    <button
                        class="inline-flex items-center justify-center rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mr-2">
                        수정
                    </button>


                    <button
                        class="inline-flex items-center justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        삭제
                    </button>
                </div>
            </div>

        </div>
        <img src="@/assets/boardSample.jpg" alt="Autumn Leaves" width="1200" height="800"
            class="rounded-lg object-cover w-full aspect-[3/2]" />
        <div class="prose prose-lg max-w-none">
            <p>
                {{ board.content }}
            </p>
        </div>
    </div>
</template>

<style scoped></style>