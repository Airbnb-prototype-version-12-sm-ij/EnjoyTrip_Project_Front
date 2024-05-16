<script setup>
import AttractionListItem from './AttractionListItem.vue'
import { useAttractionStore, useAttractionSearchStore } from '@/store/attrationStore'
import client from '@/api/client'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const loading = ref(false)

const searchStore = useAttractionSearchStore()

const { attractionSearchInfo } = storeToRefs(searchStore)

const attractionSearch = async () => {
  if (loading.value) return
  loading.value = true

  try {
    const res = await client.get('/attractions/search', {
      params: {
        sidoCode: attractionSearchInfo.value.sidoCode,
        typeCode: attractionSearchInfo.value.contentId,
        title: attractionSearchInfo.value,
        page: attractionSearchInfo.value,
        size: attractionSearchInfo.value
      }
    })
    if (res.data.length === 0) {
      Toast.fire({
        icon: 'error',
        title: '검색 결과가 없습니다.'
      })
    } else {
      attractionItems.value = [...attractionItems.value, ...res.data]
      page.value++
    }
  } catch (error) {
    console.error('에러' + error)
  } finally {
    loading.value = false
  }
}

const checkBottom = () => {
  const { innerHeight } = window
  const { scrollHeight, scrollTop } = document.documentElement
  if (scrollHeight - innerHeight - scrollTop < 500) {
    attractionSearch()
  }
}

const store = useAttractionStore()

const { attractionItems } = storeToRefs(store)

const router = useRouter()

onMounted(() => {
  if (!attractionItems.value.length) {
    router.push('/')
  }
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
