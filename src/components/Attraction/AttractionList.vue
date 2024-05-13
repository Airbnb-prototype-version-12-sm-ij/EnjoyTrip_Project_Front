<script setup>
import AttractionListItem from './AttractionListItem.vue'
import { useAttractionStore } from '@/store/attrationStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

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
  <div class="col-span-3">
    <div class="space-y-8" v-for="attractionItem in attractionItems" :key="attractionItem.id">
      <AttractionListItem :attractionItem="attractionItem" />
    </div>
  </div>
</template>

<style scoped></style>
