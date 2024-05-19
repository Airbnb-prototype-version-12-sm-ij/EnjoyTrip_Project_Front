<script setup>
import AttractionListItem from './AttractionListItem.vue'
import { useAttractionStore, useAttractionSearchStore } from '@/store/attrationStore'
import client from '@/api/client'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'
import { onMounted, ref, onBeforeUnmount, watch } from 'vue'
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

// 정렬 순서
const orderBy = ref('default')

console.log('attractionItems.value', attractionItems.value)

// 정렬 순서 변경
watch(orderBy, async (newVal) => {
  console.log(newVal)
  switch (newVal) {
    case 'nameUp':
      attractionItems.value.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'viewUp':
      attractionItems.value.sort((a, b) => b.readCount - a.readCount)
      break
    case 'nameDown':
      attractionItems.value.sort((a, b) => b.title.localeCompare(a.title))
      break
    case 'viewDown':
      attractionItems.value.sort((a, b) => a.readCount - b.readCount)
      break
    case 'scoreUp':
      attractionItems.value.sort((a, b) => b.reviewCount - a.reviewCount)
      break
    case 'likeUp':
      attractionItems.value.sort((a, b) => b.wishCount - a.wishCount)
      break
    case 'scoreDown':
      attractionItems.value.sort((a, b) => a.reviewCount - b.reviewCount)
      break
    case 'likeDown':
      attractionItems.value.sort((a, b) => a.wishCount - b.wishCount)
      break
  }
})

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
    <form class="max-w-sm mx-auto">
      <select
        v-model="orderBy"
        id="orderBy"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="default" selected>정렬 순서</option>
        <option value="nameUp">이름 ㄱ - ㅎ</option>
        <option value="nameDown">이름 ㅎ - ㄱ</option>
        <option value="viewUp">조회수 높은 순</option>
        <option value="viewDown">조회수 낮은 순</option>
        <option value="scoreUp">평점 높은 순</option>
        <option value="scoreDown">평점 낮은 순</option>
        <option value="likeUp">찜 많은 수</option>
        <option value="likeDown">찜 적은 수</option>
      </select>
    </form>
    <div class="space-y-8" v-for="attractionItem in attractionItems" :key="attractionItem.id">
      <AttractionListItem :attractionItem="attractionItem" />
    </div>
  </div>
</template>

<style scoped></style>
