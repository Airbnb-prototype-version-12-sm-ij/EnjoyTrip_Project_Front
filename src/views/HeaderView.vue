<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import client from '@/api/client'
import MyInfoModal from '@/views/modal/MyInfoModal.vue'
import MemberModal from '@/views/modal/MemberModal.vue'
import LoginModal from '@/views/modal/LoginModal.vue'
import LogoutBtn from '@/components/Button/LogoutBtn.vue'
import AttractionSearch from '@/components/Attraction/AttractionSearch.vue'

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
            {{ userInfo.userName }}
            <LogoutBtn />
          </div>
          <div v-else>
            <LoginModal />
          </div>
          <!-- 로그인 모달 end -->
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul
            class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <a
                href="#"
                class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
                @click="goToBoard"
                >게시판</a
              >
            </li>
            <li>
              <MyInfoModal />
            </li>
            <li v-if="userInfo !== null && userInfo.grade === 'admin'">
              <MemberModal />
            </li>
            <!-- <li>
              <a
                href="#"
                class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >Contact</a
              >
            </li> -->
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped></style>
