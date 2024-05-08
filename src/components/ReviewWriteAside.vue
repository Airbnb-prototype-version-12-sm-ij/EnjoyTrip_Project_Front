<script setup>
import { ref, watch, computed } from 'vue';

const together = ref('');
const score = ref(3);
const hoverScore = ref(3);



const scoreText = computed(() => {
    if (hoverScore.value === 1) {
        return '최악';
    } else if (hoverScore.value === 2) {
        return '별로';
    } else if (hoverScore.value === 3) {
        return '보통';
    } else if (hoverScore.value === 4) {
        return '좋음';
    } else if (hoverScore.value === 5) {
        return '아주 좋음';
    }
});

</script>

<template>
    <aside class="w-2/5">
        <div class="border p-8 rounded-md shadow-md mx-[-4rem] sm:mx-0">
            <h2 class="text-2xl font-bold mb-4">귀하의 경험에 대해 평가해주세요.</h2>
            <form class="space-y-4">
                <div>
                    <div class="flex mt-4 space-x-2">
                        <div v-for="i in 5" :key="i" class="w-8 h-8 rounded-full"
                            :class="{ 'bg-[#00af87]': i <= hoverScore, 'bg-gray-300': i > hoverScore }"
                            @mouseover="hoverScore = i" @mouseout="hoverScore = score" @click="score = i">
                        </div>
                        <div class='mt-1 ml-4'>
                            <strong> {{ scoreText }}</strong>
                        </div>
                    </div>
                </div>
                <div>
                    <label class="block mb-1 text-sm font-medium" for="visit-type">
                        <strong>누구와 함께 가셨나요?</strong>
                    </label>
                    <div class="flex space-x-2">
                        <button @click.prevent="together = 'bisness'"
                            :class="{ 'border-black': together === 'bisness' }"
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-3xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground hover:bg-gray-200 h-10 px-4 py-2 border-2">
                            비지니스
                        </button>
                        <button @click.prevent="together = 'couple'" :class="{ 'border-black': together === 'couple' }"
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-3xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground hover:bg-gray-200 h-10 px-4 py-2 border-2">
                            커플
                        </button>
                        <button @click.prevent="together = 'family'" :class="{ 'border-black': together === 'family' }"
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-3xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground hover:bg-gray-200 h-10 px-4 py-2 border-2">
                            가족
                        </button>
                        <button @click.prevent="together = 'friend'" :class="{ 'border-black': together === 'friend' }"
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-3xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground hover:bg-gray-200 h-10 px-4 py-2 border-2">
                            친구
                        </button>
                        <button @click.prevent="together = 'alone'" :class="{ 'border-black': together === 'alone' }"
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-3xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground hover:bg-gray-200 h-10 px-4 py-2 border-2">
                            단독
                        </button>
                    </div>
                </div>
                <div>
                    <label class="block mb-1 text-sm font-medium" for="review-content">
                        <strong>리뷰 쓰기</strong>
                    </label>
                    <textarea
                        class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                        id="review-content" placeholder="Enter review content"></textarea>

                </div>
                <div>
                    <label class="block mb-1 text-sm font-medium" for="review-title">

                        <strong>제목</strong>
                    </label>
                    <input
                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-2"
                        id="review-title" placeholder="Enter review title" />
                </div>
                <div>
                    <strong>사진 추가하기</strong>
                    <br>선택사항
                    <input
                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="review-photo" type="file" />
                </div>
                <div class='inline-flex items-center justify-center w-full'>
                    <button
                        class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 rounded-full px-24 py-2 bg-black text-white hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors">
                        리뷰 제출
                    </button>
                </div>
            </form>
        </div>
    </aside>
</template>

<style scoped></style>