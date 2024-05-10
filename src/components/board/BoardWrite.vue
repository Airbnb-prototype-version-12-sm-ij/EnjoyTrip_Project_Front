<script setup>
import client from '@/api/client'
import regionData from '@/api/regionData'
import { useRouter } from 'vue-router'
import { ref, watchEffect } from 'vue'
import Swal from 'sweetalert2'


const router = useRouter()

let sidoCode = ref(0)

let gugunData = ref([])

watchEffect(() => {
  const selectedSido = regionData[sidoCode.value]
  if (selectedSido && selectedSido.children) {
    gugunData.value = selectedSido.children
  } else {
    gugunData.value = []
  }
})

const onSubmit = (e) => {
  e.preventDefault()

  const formData = new FormData()

  const title = e.target.elements.title.value
  const content = e.target.elements.content.value
  const image = e.target.elements.upfile.files[0]
  const sidoCode = e.target.elements.sidoCode.value
  const gugunCode = e.target.elements.gugunCode.value

  formData.append('title', title)
  formData.append('content', content)
  formData.append('upfile', image)
  formData.append('sidoCode', sidoCode)
  formData.append('gugunCode', gugunCode)

  client
    .post('/posting/write', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      console.log(response.data)
      Swal.fire({
        icon: 'success',
        title: '게시글이 작성되었습니다.',
        showConfirmButton: false,
        // confirmButtonColor: '#4caf50',
        // confirmButtonText: '확인',
        timer: 6000
      })
      router.push({ name: 'board' })
    })
    .catch(() => {
      Swal.fire({
        icon: 'error',
        title: '게시글 작성에 실패했습니다.',
        showConfirmButton: true,
        confirmButtonColor: '#4caf50',
        confirmButtonText: '확인'
      })
    })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
    <div class="w-full max-w-7xl px-10 py-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <form class="space-y-16 h-[56rem] mx-auto" enctype="multipart/form-data" @submit.prevent="onSubmit">
        <div class="flex">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="city">
              <strong>시도</strong>
            </label>
            <select id="sidoCode" name="sidoCode" v-model="sidoCode">
              <option v-for="item in regionData" :key="item.id" :value="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="city">
              <strong>구군</strong>
            </label>
            <Select id="gugunCode" name="gugunCode">
              <option value="0">전체</option>
              <option v-for="item in gugunData" :key="item.id" :value="item.id">
                {{ item.name }}
              </option>
            </Select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="title">
            <strong>제목</strong>
          </label>
          <input
            class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            id="title" name="title" placeholder="Enter a title" type="text" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="content">
            <strong>내용</strong>
          </label>
          <textarea
            class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            id="content" name="content" placeholder="Enter content" rows="20"></textarea>
        </div>

        <div class="flex flex-col items-start justify-center space-y-4">
          <label for="image" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            <strong>사진 업로드</strong>
          </label>
          <div
            class="w-full max-w-l px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md dark:border-gray-600 flex items-center justify-center">
            <div class="space-y-1 text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"
                aria-hidden="true">
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              <div class="flex text-sm text-gray-600 dark:text-gray-400">
                <label for="image"
                  class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300">
                  <input type="file" class="form-control border" id="upfile" name="upfile" multiple="multiple" />
                </label>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF 최대 10MB</p>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-4">
          <button
            class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            type="submit">
            작성하기
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
