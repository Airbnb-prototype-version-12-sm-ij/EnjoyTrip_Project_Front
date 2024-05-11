<script setup>

const props = defineProps({
    comment: Object
})

</script>

<template>
    <div class="text-sm flex items-start gap-4">
        <div
            class="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center font-medium text-gray-900 dark:bg-gray-800 dark:text-gray-50">
            프로필
        </div>
        <div class="grid gap-1.5">
            <div class="flex items-center gap-2">
                <div class="font-semibold">{{ comment.userId }}</div>
                <div class="text-gray-500 text-xs dark:text-gray-400">{{ comment.createdAt }}</div>
            </div>
            <div>{{ comment.comment }}</div>
        </div>
    </div>
</template>

<style scoped></style>