<script setup></script>

<template>
  <RouterLink
    :to="{ name: 'detail' }"
    class="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-row"
    data-v0-t="card"
  >
    <!-- 이미지 -->
    <img
      alt="Restaurant Image"
      class="w-1/3 rounded-l-md"
      height="120"
      src="../assets/bangbang_goggog_logo_1.svg"
      width="120"
      style="aspect-ratio: 120 / 120; object-fit: cover"
    />
    <div class="w-2/3 p-4">
      <!-- 제목 -->
      <h3 class="text-lg font-semibold">유명가게(와) 인기있는 거실 코너</h3>
      <div class="flex items-center mt-2 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-yellow-400"
        >
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          ></polygon>
        </svg>
        <!-- 찜 수 -->
        <span class="ml-2">65</span>
        <span class="mx-2">|</span>
        <!-- 카테고리 -->
        <span>단골집, 좌석</span>
      </div>
      <!-- 설명 -->
      <p class="text-sm">
        ... 시민들 다 먹는 지역에 위치하는 사람들이 많은 편한 풍경을 담아 보는 술집이 대학 기복 답고
        있기는 취향이 있다 먹지 않겠죠...
      </p>
    </div>
  </RouterLink>
</template>

<style scoped></style>
