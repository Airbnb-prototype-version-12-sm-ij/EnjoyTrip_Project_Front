<script setup>
import client from '@/api/client'
import MarkdownIt from 'markdown-it'
import WishListItem from './WishListItem.vue'
import { ref, onMounted } from 'vue'
import WishMap from './WishMap.vue'
import OpenAI from 'openai'

const markdown = new MarkdownIt()

const getWishList = async () => {
  try {
    const res = await client.get('/attractions/wishList')
    wishList.value = res.data
    console.log(res.data)
  } catch (error) {
    console.error('에러' + error)
  }
}

const wishList = ref([])

let text = ref('')

onMounted(async () => {
  await getWishList()
})

const isLoading = ref(false)

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

const result = ref({
  content: ''
})
const getTripRoute = async () => {
  isLoading.value = true
  text.value = wishList.value
  console.log(wishList.value)
  console.log('API 호출')
  console.log(JSON.stringify(text.value))
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: import.meta.env.VITE_PROMPT
      },
      {
        role: 'user',
        content: JSON.stringify(text.value)
      }
    ],
    model: 'gpt-3.5-turbo',
    max_tokens: 2000
  })

  result.value = response.choices[0].message.content
  response.choices[0].message.content.replace(/`/g, '').replace('javascript', '')
  wishList.value = eval(
    response.choices[0].message.content.replace(/`/g, '').replace('javascript', '')
  )
  await getExplanation()
  isLoading.value = false
}

const getExplanation = async () => {
  isLoading.value = true
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'assistant',
        content: result.value
      },
      {
        role: 'user',
        content:
          '해당 여행 경로에 대한 설명, 여행 경로 순서를 정한 이유, 예상 소요시간, 경비등의 이유를 문단 사이에 띄어쓰기를 하여 마크다운 형식으로 분류별로 사용자 친화적으로 제공하시오  그리고 그 외의 답변은 허용하지 않습니다'
      }
    ],
    model: 'gpt-3.5-turbo',
    max_tokens: 2000
  })

  console.log(response.choices[0].message)
  result.value = response.choices[0].message
}
</script>

<template>
  <div class="flex">
    <div class="mt-[100px] col-span-3">
      <h1 style="margin-left: 300px; font-size: 36px">찜 목록</h1>
      <WishListItem :wish="wish" v-for="wish in wishList" :key="wish.id" />
    </div>
    <div class="flex-col">
      <WishMap :wishList="wishList" v-if="wishList" />

      <div class="flex items-start justify-start h-3/4 bg-gray-900">
        <div class="flex flex-col">
          <div
            @click="getTripRoute"
            style="width: 300px"
            class="flex mt-5 ml-5 px-6 py-3 rounded-md bg-gray-50 text-gray-900 font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <img src="@/assets/GPT.png" width="60px" />
            <a class="flex items-center justify-center ml-5">
              여행경로 추천 받기 {{ isLoading }}
            </a>
          </div>

          <div
            role="status"
            class="max-w-2xl animate-pulse ml-10 mt-20"
            style="width: 1500px"
            v-show="isLoading"
          >
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-340 mb-4"></div>
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-4"></div>
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-340 mb-4"></div>
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-4"></div>
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-340 mb-4"></div>
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-340 mb-4"></div>
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-4"></div>
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-340 mb-4"></div>
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-340 mb-4"></div>
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-340 mb-4"></div>
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-340 mb-4"></div>
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-340 mb-4"></div>
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-340 mb-4"></div>
            <span class="sr-only">Loading...</span>
          </div>
          <p v-html="markdown.render(result.content)" style="color: white" class="ml-14 mt-14"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
