<script setup>
import AttractionListItem from './AttractionListItem.vue'
import { useAttractionStore, useAttractionSearchStore } from '@/store/attrationStore'
import client from '@/api/client'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

const searchStore = useAttractionSearchStore()

const { attractionSearchInfo } = storeToRefs(searchStore)

const addedItemIds = new Set()

const pageNo = ref(10)

const store = useAttractionStore()

const { attractionItems } = storeToRefs(store)

const router = useRouter()

// 스크롤 다운 검색
const scrollDownSearch = async () => {
  try {
    const res = await client.get('/attractions/search', {
      params: {
        sidoCode: attractionSearchInfo.value.sidoCode,
        typeCode: attractionSearchInfo.value.typeCode,
        title: attractionSearchInfo.value.title,
        page: pageNo.value,
        size: 10
      }
    })
    if (res.data.length < 10) {
      Toast.fire({
        icon: 'success',
        title: '검색 결과가 모두 로드되었습니다.'
      })
    } else {
      const newItems = res.data.filter((item) => !addedItemIds.has(item.contentId))
      newItems.forEach((item) => addedItemIds.add(item.contentId))
      attractionItems.value = attractionItems.value.concat(newItems)
      store.setItems(attractionItems.value)
      pageNo.value += 10
    }
  } catch (error) {
    console.error('에러' + error)
  }
}

const handleScroll = (e) => {
  e.preventDefault()
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    scrollDownSearch()
  }
}

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

onMounted(() => {
  if (!attractionItems.value.length) {
    router.push('/')
  }
  window.addEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="mt-[40px] col-span-3">
    <div class="space-y-8" v-for="attractionItem in attractionItems" :key="attractionItem.id">
      <AttractionListItem :attractionItem="attractionItem" />
    </div>
  </div>
</template>

<style scoped></style>
