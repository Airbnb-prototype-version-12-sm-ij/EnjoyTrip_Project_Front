<script setup>
import client from '@/api/client'

import WishListItem from './WishListItem.vue'
import { ref, onMounted } from 'vue'

import Draggable from 'vue3-draggable'
import KakaoMobility from './KakaoMobility.vue'
import ChatGpt from './ChatGpt.vue'
import { useWishList } from '@/store/attrationStore'

const wishStore = useWishList()

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

const updateWishList = (newWishList) => {
  wishList.value = newWishList
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

const gptloading = ref(true)

const loading = () => {
  gptloading.value = false
}
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
      <KakaoMobility
        :wishList="wishList"
        @loading="loading"
        v-if="isInit"
        class="rounded-xl"
        :load="load"
      />
      <div v-if="!gptloading">
        <ChatGpt
          :wishList="wishList"
          @update-wishlist="updateWishList"
          v-if="isInit"
          class="rounded-xl"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
