<script setup>
import client from '@/api/client'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

const router = useRouter()

const props = defineProps({
  postId: Number
})

const isLoading = ref(true)
console.log(props.postId)

const board = ref({})

const getBoard = async () => {
  try {
    const response = await axios.get('http://localhost/posting/' + props.postId)
    board.value = response.data
  } catch {
    alert('에러가 발생했습니다.')
  }
}

const modifyBoard = async () => {
  try {

    const response = await client.put('/posting/' + props.postId, {
      title: board.value.title,
      content: board.value.content,
      sidoCode: board.value.sidoCode,
      gugunCode: board.value.gugunCode
    })
    console.log(response.data)
    Swal.fire({
      icon: 'success',
      title: '게시글이 수정되었습니다.',
      showConfirmButton: true,
      timer: 2000
    })

    router.push({ name: 'board' })
  } catch {
    alert('에러가 발생했습니다.')
  }
}

onMounted(async () => {
  await getBoard()
  isLoading.value = false
  console.log(board.value)
})
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
    <div class="w-full max-w-7xl px-10 py-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <form class="space-y-16 h-[56rem] mx-auto" enctype="multipart/form-data" @submit.prevent="onSubmit">
        <div class="flex">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="title">
            <strong>제목</strong>
          </label>
          <input
            class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            id="title" name="title" placeholder="Enter a title" type="text" v-model='board.title' />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="content">
            <strong>내용</strong>
          </label>
          <textarea
            class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            id="content" name="content" placeholder="Enter content" rows="20" v-model="board.content"></textarea>
        </div>

        <div class="flex flex-col items-start justify-center space-y-4"> </div>

        <div class="flex justify-end gap-4">
          <button @click='modifyBoard'
            class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            type="button">
            수정하기
          </button>
          <button
            class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-500 dark:hover:bg-gray-600"
            type="button" @click="router.push({ name: 'board' })">
            뒤로가기
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
