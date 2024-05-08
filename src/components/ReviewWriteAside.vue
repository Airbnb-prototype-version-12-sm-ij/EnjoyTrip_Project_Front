<script setup>

</script>

<template>
    <aside class="w-2/5">
        <div class="border p-8 rounded-md shadow-md mx-[-4rem] sm:mx-0">
            <h2 class="text-2xl font-bold mb-4">귀하의 경험에 대해 평가해주세요.</h2>
            <form class="space-y-4">
                <div>
                    <div class="flex mt-4 space-x-2">
                        <div class="w-5 h-5 bg-[#00af87] rounded-full"></div>
                        <div class="w-5 h-5 bg-[#00af87] rounded-full"></div>
                        <div class="w-5 h-5 bg-[#00af87] rounded-full"></div>
                        <div class="w-5 h-5 bg-[#00af87] rounded-full"></div>
                        <div class="w-5 h-5 bg-gray-300 rounded-full"></div>
                    </div>
                </div>
                <div>
                    <label class="block mb-1 text-sm font-medium" for="visit-type">
                        <strong>누구와 함께 가셨나요?</strong>
                    </label>
                    <div class="flex space-x-2">
                        <button
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 border-2">
                            비지니스
                        </button>
                        <button
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 border-2">
                            커플
                        </button>
                        <button
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 border-2">
                            가족
                        </button>
                        <button
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 border-2">
                            친구
                        </button>
                        <button
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 border-2">
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
                <button
                    class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 rounded-md px-6 py-2 bg-[#00af87] text-white hover:bg-[#00af87]/90 focus:outline-none focus:ring-2 focus:ring-[#00af87] focus:ring-offset-2 transition-colors">
                    Submit Review
                </button>
            </form>
        </div>
    </aside>
</template>

<style scoped></style>