<script setup>
import { ref } from 'vue'
import Score from '../common/Score.vue';
import ReviewPercentage from './ReviewPercentage.vue';
import ReviewList from './ReviewList.vue';

const reviewScore = 2.3;

const reviewScoreCount = [5, 5, 21, 53, 18];
const viewCount = 24;

</script>

<template>
  <div class="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      <div class="flex flex-wrap items-center justify-between mb-8 gap-4">
        <RouterLink :to="{ name: 'review' }"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
          리뷰 작성하기
        </RouterLink>
      </div>
      <h2 class="text-3xl font-semibold mb-6">Review</h2>
      <div class="bg-white p-8 rounded-lg shadow-md">
        <div class="flex flex-col md:flex-row mb-8">
          <div class="md:w-1/3 pr-8">
            <div class="flex items-center mb-4">
              <h3 class="text-2xl font-medium mr-2">{{ reviewScore }}</h3>
              <div class="flex">
                <Score :score="reviewScore" />
              </div>
              <p class="text-sm text-gray-500 ml-4">{{ viewCount }} reviews</p>
            </div>
            <div class="space-y-2">
              <ReviewPercentage :reviewScoreCount="reviewScoreCount" />
            </div>
          </div>
          <div class="md:w-2/3">
            <div class="flex flex-col md:flex-row items-center mb-4 gap-4">
              <input
                class="flex h-10 border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full md:w-[300px] p-2 border rounded-md"
                placeholder="Search reviews..." />
              <div class="flex gap-4">
                <button type="button" role="combobox" aria-controls="radix-:R1jflafnnja:" aria-expanded="false"
                  aria-autocomplete="none" dir="ltr" data-state="closed" data-placeholder=""
                  class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="sort">
                  <span style="pointer-events: none">Recent</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="h-4 w-4 opacity-50" aria-hidden="true">
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
                <select aria-hidden="true" tabindex="-1" style="
                    position: absolute;
                    border: 0;
                    width: 1px;
                    height: 1px;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0, 0, 0, 0);
                    white-space: nowrap;
                    word-wrap: normal;
                  ">
                  <option value=""></option>
                </select>
                <button type="button" role="combobox" aria-controls="radix-:R2jflafnnja:" aria-expanded="false"
                  aria-autocomplete="none" dir="ltr" data-state="closed" data-placeholder=""
                  class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="filter">
                  <span style="pointer-events: none">Highest Rated</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="h-4 w-4 opacity-50" aria-hidden="true">
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
                <select aria-hidden="true" tabindex="-1" style="
                    position: absolute;
                    border: 0;
                    width: 1px;
                    height: 1px;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0, 0, 0, 0);
                    white-space: nowrap;
                    word-wrap: normal;
                  ">
                  <option value=""></option>
                </select>
              </div>
            </div>
            <ReviewList />
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
