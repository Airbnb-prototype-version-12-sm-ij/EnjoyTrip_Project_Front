<script setup>

defineProps({
    board: Object
});


</script>

<template>
    <div class="grid gap-8 max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid gap-2">
            <h1 class="text-3xl font-bold">{{ board.title }}</h1>
            <div class="flex items-center gap-4 text-sm text-gray-500">
                <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <img class="aspect-square h-full w-full" alt="@shadcn" src="@/assets/sample.png" />
                </span>
                <div>
                    <div class="font-medium">{{ board.userId }}</div>
                    <div>{{ board.createdAt }}</div>
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