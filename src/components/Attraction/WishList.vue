<script setup>

import SideMenu from '@/components/SideMenu.vue'
import client from '@/api/client';
import WishListItem from './WishListItem.vue';
import { ref, onMounted } from 'vue';



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
  <div>
    <div class="mt-[100px] col-span-3">
      <h1 style='margin-left:300px; font-size:40px'>찜 목록</h1>
      <div class="ml-10" v-for="wish in wishList" :key="wish.id">
        <WishListItem :wish="wish" />
      </div>
    </div>

  </div>
</template>

<style scoped></style>