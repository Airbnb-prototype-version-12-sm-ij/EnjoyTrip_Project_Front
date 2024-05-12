<script setup>
import AttractionListItem from './AttractionListItem.vue'
import AttractionListItemCopy from './AttractionListItemCopy.vue';

const props = defineProps({
  attractionItems: Array
})
</script>

<template>
  <div class="col-span-3">
    <div class="space-y-8" v-for="(attractionItem, index) in props.attractionItems" :key="index">
      <AttractionListItemCopy :attractionItem="attractionItem" />
    </div>
  </div>
</template>

<style scoped></style>
