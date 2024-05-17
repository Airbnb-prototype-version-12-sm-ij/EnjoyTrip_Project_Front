<script setup>
import client from '@/api/client'
import WishListItem from './WishListItem.vue'
import { ref, onMounted } from 'vue'
import WishMap from './WishMap.vue'
import OpenAI from 'openai'

const wishList = ref([])

const getWishList = async () => {
  try {
    const res = await client.get('/attractions/wishList')
    wishList.value = res.data
    console.log(res.data)
  } catch (error) {
    console.error('에러' + error)
  }
}

onMounted(async () => {
  await getWishList()
})

const result = ref('')

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

const getResponse = async () => {
  console.log(wishList.value)
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'assistant',
        content:
          '당신은 한국의 여행관련 웹 사이트에서 여행 경로를 추천해주는 사람입니다. 제가 자바 스크립트 여행 정보 객체 리스트를 입력하면 리스트 요소를 보고 모든 여행지에 대한 여행 순서를 정해야 합니다.  해당 여행 경로에 대한 설명, 여행 경로 순서를 정한 이유와 예상 소요시간 및 경비에 대한 요약을 한국인을 대상으로 정성스럽게 작성하여  HTML문서의 Body 형식으로 제공하시오  그리고 그 외의 답변은 허용하지 않습니다'
      },
      {
        role: 'user',
        content: `[
    {
        "readcount": 69245,
        "addr2": "",
        "content_id": 126518,
        "addr1": "서울특별시 광진구 광장동",
        "first_image": "http://tong.visitkorea.or.kr/cms/resource/23/741923_image2_1.jpg",
        "latitude": 37.55382466,
        "content_type_id": 12,
        "title": "아차산성",
        "zipcode": "4963",
        "sido_code": 1,
        "mlevel": "6",
        "gugun_code": 6,
        "tel": "",
        "first_image2": "http://tong.visitkorea.or.kr/cms/resource/23/741923_image3_1.jpg",
        "longitude": 127.104871
    },
    {
        "readcount": 19245,
        "addr2": "",
        "content_id": 250352,
        "addr1": "서울특별시 중랑구 신내동",
        "first_image": "http://tong.visitkorea.or.kr/cms/resource/20/2350520_image2_1.jpg",
        "latitude": 37.60863186,
        "content_type_id": 12,
        "title": "아차산봉수대터",
        "zipcode": "2041",
        "sido_code": 1,
        "mlevel": "6",
        "gugun_code": 25,
        "tel": "",
        "first_image2": "http://tong.visitkorea.or.kr/cms/resource/20/2350520_image3_1.jpg",
        "longitude": 127.0866933
    },
    {
        "readcount": 0,
        "addr2": "",
        "content_id": 2779539,
        "addr1": "서울특별시 광진구 구의동 3",
        "first_image": "http://tong.visitkorea.or.kr/cms/resource/66/2796466_image2_1.jpg",
        "latitude": 37.55373848,
        "content_type_id": 12,
        "title": "아차산 고구려정",
        "zipcode": "",
        "sido_code": 1,
        "mlevel": "6",
        "gugun_code": 6,
        "tel": "",
        "first_image2": "http://tong.visitkorea.or.kr/cms/resource/66/2796466_image2_1.jpg",
        "longitude": 127.1005658
    },
    {
        "readcount": 15252,
        "addr2": "(청천동)",
        "content_id": 132702,
        "addr1": "인천광역시 부평구 마장로 489",
        "first_image": "http://tong.visitkorea.or.kr/cms/resource/45/1924145_image2_1.jpg",
        "latitude": 37.52134348,
        "content_type_id": 38,
        "title": "아이즈빌아울렛",
        "zipcode": "21302",
        "sido_code": 2,
        "mlevel": "6",
        "gugun_code": 6,
        "tel": "032-270-2000",
        "first_image2": "http://tong.visitkorea.or.kr/cms/resource/45/1924145_image3_1.jpg",
        "longitude": 126.7032141
    },
    {
        "readcount": 22129,
        "addr2": "",
        "content_id": 136577,
        "addr1": "서울특별시 강서구 까치산로 83",
        "first_image": "http://tong.visitkorea.or.kr/cms/resource/39/1805439_image2_1.jpg",
        "latitude": 37.54605984,
        "content_type_id": 32,
        "title": "르아브르",
        "zipcode": "7678",
        "sido_code": 1,
        "mlevel": "6",
        "gugun_code": 4,
        "tel": "02-2606-9552",
        "first_image2": "http://tong.visitkorea.or.kr/cms/resource/39/1805439_image3_1.jpg",
        "longitude": 126.8475613
    },
    {
        "readcount": 19837,
        "addr2": "",
        "content_id": 132593,
        "addr1": "서울특별시 금천구 디지털로9길 23",
        "first_image": "http://tong.visitkorea.or.kr/cms/resource/10/1923610_image2_1.jpg",
        "latitude": 37.47862948,
        "content_type_id": 38,
        "title": "마리오아울렛",
        "zipcode": "8511",
        "sido_code": 1,
        "mlevel": "6",
        "gugun_code": 8,
        "tel": "02-2109-7000",
        "first_image2": "http://tong.visitkorea.or.kr/cms/resource/10/1923610_image2_1.jpg",
        "longitude": 126.8863708
    }
]`
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
      <WishMap :wishList="wishList" v-if="!wishList.value" />
      <button @click="getResponse">여행경로 추천 받기</button>

      <p v-html="result.content"></p>
    </div>
  </div>
</template>

<style scoped></style>
