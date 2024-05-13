<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import client from '@/api/client'
import MyInfoModal from '@/views/modal/MyInfoModal.vue'
import MemberModal from '@/views/modal/MemberModal.vue'
import LoginModal from '@/views/modal/LoginModal.vue'
import AttractionSearch from '@/components/Attraction/AttractionSearch.vue'
import UserDropdown from '@/views/dropdown/UserDropdown.vue'

// 알림창
// const Toast = Swal.mixin({
//   toast: true,
//   position: 'top-end',
//   showConfirmButton: false,
//   timer: 3000,
//   timerProgressBar: true,
//   didOpen: (toast) => {
//     toast.addEventListener('mouseenter', Swal.stopTimer)
//     toast.addEventListener('mouseleave', Swal.resumeTimer)
//   }
// })
// 게시판 이동
const goToBoard = () => {
  router.push({ name: 'board' })
}
const router = useRouter()

// 세션에서 로그인 정보 가져오기
const loadingState = ref({ isLoading: true })

onMounted(async () => {
  if (sessionStorage.getItem('memberDto') !== null) {
    if (!sessionStorage.getItem('refreshed')) {
      sessionStorage.setItem('refreshed', 'true')
      await router.go(0)
    } else {
      sessionStorage.removeItem('refreshed')
    }
  }
  try {
    const res = await client.get('/members/ping')
    if (res.status === 200) {
      if (res.data !== '') {
        sessionStorage.setItem('memberDto', JSON.stringify(res.data))
      }
    } else {
      await router.go(0)
    }
  } catch (error) {
    console.error(error)
  }
  loadingState.value.isLoading = false // 로딩이 완료되었음을 표시
})
// 로그인 정보 계속 확인용
client.get('/members/ping').then((res) => {
  if (res.status === 200) {
    if (res.data === '') {
      return
    }
    sessionStorage.setItem('memberDto', JSON.stringify(res.data))
  } else {
    router.go(0)
  }
})

// 세션에서 로그인 정보 가져오기
const isLoggedIn = computed(() => {
  return sessionStorage.getItem('memberDto') !== null
})

// 세션에서 회원 정보 가져오기
const userInfo = computed(() => {
  const memberDto = sessionStorage.getItem('memberDto')
  return memberDto ? JSON.parse(memberDto) : null
})
</script>

<template>
  <div v-if="loadingState.isLoading">
    <!-- 로딩 창 컴포넌트 또는 로딩 창에 대한 HTML을 여기에 추가하세요 -->
  </div>
  <div v-else>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <RouterLink :to="{ name: 'home' }" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >방방 곡곡</span
          >
        </RouterLink>
        <!-- 검색 바 start -->
        <AttractionSearch />
        <!-- 검색 바 end -->
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <!-- 로그인 모달 start -->
          <div v-if="isLoggedIn">
            <UserDropdown />
          </div>
          <div v-else>
            <LoginModal />
          </div>
          <!-- 로그인 모달 end -->
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped></style>
