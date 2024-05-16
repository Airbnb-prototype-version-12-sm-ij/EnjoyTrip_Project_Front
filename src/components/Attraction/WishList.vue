<script setup>

import client from '@/api/client';
import WishListItem from './WishListItem.vue';
import { ref, onMounted } from 'vue';
import WishMap from './WishMap.vue';



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


onMounted(() => {
  getWishList()
})

</script>

<template>
  <div class='flex'>
    <div class="mt-[100px] col-span-3">
      <h1 style='margin-left:300px; font-size:36px'>찜 목록</h1>
      <WishListItem :wish="wish" v-for="wish in wishList" :key="wish.id" />
    </div>
    <WishMap :wishList='wishList' v-if="!wishList.value" />
  </div>
</template>

<style scoped></style>