<script setup>
import client from '@/api/client'
import MarkdownIt from 'markdown-it'
import WishListItem from './WishListItem.vue'
import { ref, onMounted } from 'vue'
import OpenAI from 'openai'
import Draggable from 'vue3-draggable'
import KakaoMobility from './KakaoMobility.vue'
import { useWishList } from '@/store/attrationStore'

const isLoading = ref(false)

const wishStore = useWishList()

const markdown = new MarkdownIt()

const isInit = ref(false)

const wishList = ref([])

const getWishList = async () => {
  try {
    const res = await client.get('/attractions/wishList')
    wishStore.clearWishList()
    wishList.value = res.data
    wishStore.setWishList(wishList.value)
  } catch (error) {
    console.error('에러' + error)
  }
  isInit.value = true
}

let text = ref('')

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
  console.log(response.choices[0].message.content.replace(/`/g, '').replace('javascript', ''))
  wishList.value = eval(
    response.choices[0].message.content.replace(/`/g, '').replace('javascript', '')
  )

  await getExplanation()
  isLoading.value = false
}

const getExplanation = async () => {
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
    model: 'gpt-4o',
    max_tokens: 2000
  })

  console.log(response.choices[0].message)
  result.value = response.choices[0].message
}

const handleDelete = (wishToDelete) => {
  console.log('에밋')
  const index = wishList.value.findIndex((wish) => wish === wishToDelete)
  if (index !== -1) {
    wishList.value.splice(index, 1)
  }
}

onMounted(async () => {
  await getWishList()
})

const loading = ref(true)

const load = () => {
  loading.value = false
}

console.log('load', loading)
</script>

<template>
  <div class="flex">
    <div class="mt-[100px] col-span-3 min-w-[100vh]">
      <h1 style="margin-left: 260px; font-size: 36px">찜 목록</h1>

      <draggable v-model="wishList" v-if="isInit" :key="JSON.stringify(wishList)">
        <template v-slot:item="{ item }">
          <div>
            <WishListItem :wish="item" @delete="handleDelete" />
          </div>
        </template>
      </draggable>
    </div>

    <!-- 경로 및 chatgpt -->
    <div class="flex-col">
      <KakaoMobility :wishList="wishList" v-if="isInit" class="rounded-xl" :load="load" />
      <div v-if="!loading">
        <div
          class="border flex items-start justify-start h-[815px] w-full max-w-[640px] rounded-xl"
        >
          <div class="flex flex-col w-full">
            <div
              @click="getTripRoute"
              :style="{
                width: '300px',
                backgroundColor: isLoading ? '#D3D3D3' : 'white',
                pointerEvents: isLoading ? 'none' : 'auto'
              }"
              class="border w-full flex mt-5 ml-5 px-6 py-3 rounded-md bg-gray-50 text-gray-900 font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <img src="@/assets/GPT.png" width="60px" />
              <a class="flex items-center justify-center ml-5">
                AI 여행 계획 생성
                <div role="status" class="ml-5" v-show="isLoading">
                  <svg
                    aria-hidden="true"
                    class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              </a>
            </div>

            <div role="status" class="max-w-2xl animate-pulse mx-10 mt-20 mr-16" v-show="isLoading">
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
            <p
              v-html="markdown.render(result.content)"
              style="color: black"
              class="mx-14 mt-14"
              v-show="!isLoading"
            ></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
