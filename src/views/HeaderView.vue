<script setup></script>

<template>
  <div class="max-w-7xl mx-auto pt-10">
    <div class="flex justify-between items-center mb-8">
      <div class="flex space-x-4 items-center">
        <img alt="Logo" height="60" src="../assets/bangbang_goggog_logo_1.svg" width="60"
          style="aspect-ratio: 160 / 160; object-fit: cover" />
        <div class="flex items-center">
          <input
            class="flex h-10 w-full border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border rounded-lg px-4 py-2"
            placeholder="검색" type="search" />
          <button
            class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 bg-blue-500 text-white rounded-lg px-4 py-2 ml-2">
            검색
          </button>
        </div>
      </div>
      <div class="flex space-x-4">
        <button type="button" role="combobox" aria-controls="radix-:r11:" aria-expanded="false" aria-autocomplete="none"
          dir="ltr" data-state="closed" data-placeholder=""
          class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <span style="pointer-events: none">KRW</span>
        </button>
        <button
          class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 border rounded-lg">
          로그인
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
