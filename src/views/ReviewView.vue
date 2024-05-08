<script setup>

</script>

<template>
    <div class="container mx-auto px-4">
        <header class="flex justify-between items-center py-4 border-b">
            <div class="flex items-center space-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="h-8 w-8 text-[#00af87]">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                    <path d="M2 12h20"></path>
                </svg>
                <nav class="flex space-x-4">
                    <a class="text-sm" href="#" rel="ugc">
                        홈
                    </a>
                    <a class="text-sm" href="#" rel="ugc">
                        호텔
                    </a>
                    <a class="text-sm" href="#" rel="ugc">
                        즐길거리
                    </a>
                    <a class="text-sm" href="#" rel="ugc">
                        음식점
                    </a>
                    <a class="text-sm" href="#" rel="ugc">
                        항공권
                    </a>
                    <a class="text-sm" href="#" rel="ugc">
                        렌터카
                    </a>
                </nav>
            </div>
            <div class="flex items-center space-x-4">
                <input
                    class="flex h-10 w-full border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border rounded-md px-2 py-1 text-sm"
                    placeholder="검색" type="search" />
                <a class="text-sm" href="#" rel="ugc">
                    휴가패키지
                </a>
                <a class="text-sm" href="#" rel="ugc">
                    여행
                </a>
                <a class="text-sm" href="#" rel="ugc">
                    리뷰
                </a>
                <a class="text-sm" href="#" rel="ugc">
                    KRW
                </a>
                <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <img class="aspect-square h-full w-full" alt="User" src="../assets/bangbang_goggog_logo_1.svg" />
                </span>
            </div>
        </header>
        <main class="flex mt-8">
            <section class="w-2/3 pr-8 space-y-4">
                <h1 class="text-3xl font-bold mb-4">방문하신 시설은 만족스러우셨나요?</h1>
                <div class="flex items-center space-x-6">
                    <img alt="Place" class="border rounded-lg" height="300" src="../assets/bangbang_goggog_logo_1.svg"
                        width="300" style="aspect-ratio: 300 / 300; object-fit: cover;" />
                    <div>
                        <h2 class="text-2xl font-bold">공주펜션리조트</h2>
                        <p class="text-sm text-gray-500">후기 유지트 677</p>
                        <p class="text-sm text-gray-500">공주, 대한민국</p>
                        <div class="mt-4 flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="h-5 w-5 fill-yellow-500">
                                <polygon
                                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                                </polygon>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="h-5 w-5 fill-yellow-500">
                                <polygon
                                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                                </polygon>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="h-5 w-5 fill-yellow-500">
                                <polygon
                                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                                </polygon>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="h-5 w-5 fill-yellow-500">
                                <polygon
                                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                                </polygon>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="h-5 w-5 fill-gray-300">
                                <polygon
                                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                                </polygon>
                            </svg>
                            <span class="text-sm text-gray-500">(4.5)</span>
                        </div>
                    </div>
                </div>
            </section>
            <aside class="w-1/3">
                <div class="border p-8 rounded-md shadow-md mx-[-4rem] sm:mx-0">
                    <h2 class="text-2xl font-bold mb-4">Share your experience</h2>
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
                                Who did you visit with?
                            </label>
                            <div class="flex space-x-2">
                                <button
                                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 border-2">
                                    Business
                                </button>
                                <button
                                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 border-2">
                                    Couple
                                </button>
                                <button
                                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 border-2">
                                    Family
                                </button>
                                <button
                                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 border-2">
                                    Friends
                                </button>
                                <button
                                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 border-2">
                                    Solo
                                </button>
                            </div>
                        </div>
                        <div>
                            <label class="block mb-1 text-sm font-medium" for="review-title">
                                Review title
                            </label>
                            <input
                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-2"
                                id="review-title" placeholder="Enter review title" />
                        </div>
                        <div>
                            <label class="block mb-1 text-sm font-medium" for="review-content">
                                Review content
                            </label>
                            <textarea
                                class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                                id="review-content" placeholder="Enter review content"></textarea>
                        </div>
                        <div>
                            <label class="block mb-1 text-sm font-medium" for="review-photo">
                                Add a photo
                            </label>
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
        </main>
    </div>
</template>

<style scoped></style>