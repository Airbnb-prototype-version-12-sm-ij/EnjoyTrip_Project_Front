<script setup>

import client from '@/api/client';
import WishListItem from './WishListItem.vue';
import { ref, onMounted } from 'vue';
import WishMap from './WishMap.vue';
import OpenAI from "openai";


const getWishList = async () => {
  try {
    const res = await client.get('/attractions/wishList',)
    wishList.value = res.data
    console.log(res.data)
  } catch (error) {
    console.error('에러' + error)
  }
}

const wishList = ref([])

let text = ref("");
onMounted(async () => {
  await getWishList()
  text.value = wishList.value
})


const result = ref('')


const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const getResponse = async () => {
  console.log(wishList.value);
  console.log("ㅎㅇㅎㅇ");
  console.log(JSON.stringify(text.value));
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "당신은 한국의 여행관련 웹 사이트에서 여행 경로를 추천해주는 AI입니다. 제가 자바 스크립트 여행 정보 객체 리스트를 입력하면 리스트 요소를 보고 모든 여행지에 대한 여행 순서를 정해야 합니다. 제가 제공한 형식으로 자바 스크립트 객체 리스트의 순서를 바꿔서 코드로 제공하고 그 외의 답변은 허용하지 않습니다",
      },
      {
        role: "user",
        content: JSON.stringify(text.value),
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 2000,
  });

  console.log(response.choices[0].message);
  result.value = eval(response.choices[0].message.content.replace(/`/g, '').replace("javascript", ''));
  wishList.value = result.value;
}


</script>

<template>
  <div class='flex'>
    <div class="mt-[100px] col-span-3">
      <h1 style='margin-left:300px; font-size:36px'>찜 목록</h1>
      <WishListItem :wish="wish" v-for="wish in wishList" :key="wish.id" />
    </div>
    <div class='flex-col'>
      <WishMap :wishList='wishList' v-if="!wishList.value" />
      <button @click='getResponse'>여행경로 추천 받기 </button>

    </div>

  </div>
</template>

<style scoped></style>