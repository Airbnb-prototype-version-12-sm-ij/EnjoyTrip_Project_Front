<script setup>
import Swal from 'sweetalert2'
import client from '@/api/client'
import { useRouter } from 'vue-router'

const router = useRouter()

// 로그아웃
const logout = async () => {
  try {
    await client.post('/members/logout')
    sessionStorage.removeItem('memberDto')
    Swal.fire({
      title: '로그아웃 성공',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: '확인'
    }).then(() => {
      router.go(0)
    })
  } catch (error) {
    console.error('로그아웃 에러: ', error)
  }
}
</script>

<template>
  <button
    @click="logout"
    type="button"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Logout
  </button>
</template>

<style scoped></style>
