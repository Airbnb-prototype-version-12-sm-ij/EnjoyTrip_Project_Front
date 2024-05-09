<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useAttractionStore } from '@/store/attrationStore'
import LoginModal from '@/views/modal/LoginModal.vue'
import client from '@/api/client'
// 알림창
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
// 게시판 이동
const goToBoard = () => {
  router.push({ name: 'board' })
}

// 관광지 검색
const router = useRouter()
const { setItems } = useAttractionStore()
const sidoCode = ref(0)
const contentId = ref(0)
const title = ref('')
const attractionItems = ref([])

const attractionSearch = async () => {
  try {
    const res = await client.get('/attractions/search', {
      params: {
        sidoCode: sidoCode.value,
        typeCode: contentId.value,
        title: title.value
      }
    })
    if (res.data.length === 0) {
      Toast.fire({
        icon: 'error',
        title: '검색 결과가 없습니다.'
      })
    } else {
      attractionItems.value = res.data
      setItems(attractionItems.value)
      router.push({ name: 'search' })
    }
  } catch (error) {
    console.error('에러' + error)
  }
}
// 로그인 모달 관리
const isLoginModalOpen = ref(false)

const openLoginModal = () => {
  isLoginModalOpen.value = true
}
const closeLoginModal = () => {
  isLoginModalOpen.value = false
}

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

// 로그아웃
const logout = async () => {
  try {
    await client.post('/members/logout')
    sessionStorage.removeItem('memberDto')
    router.go(0)
  } catch (error) {
    console.error('로그아웃 에러: ', error)
  }
}
</script>

<template>
  <div v-if="loadingState.isLoading">
    <!-- 로딩 창 컴포넌트 또는 로딩 창에 대한 HTML을 여기에 추가하세요 -->
  </div>
  <div v-else>
    <!-- 로딩이 완료된 후 보여줄 컴포넌트 또는 HTML을 여기에 추가하세요 -->

    <div class="max-w-7xl mx-auto pt-10">
      <div class="flex justify-between items-center mb-8">
        <div class="flex space-x-4 items-center">
          <!-- 로고 및 이름 -->
          <RouterLink :to="{ name: 'home' }" class="flex items-center">
            <img
              alt="Logo"
              height="60"
              src="../assets/bangbang_goggog_logo_1.svg"
              width="60"
              style="aspect-ratio: 160 / 160; object-fit: cover"
            />
            <h1 class="text-2xl font-bold text-primary-foreground">방방곡곡</h1>
          </RouterLink>
          <!-- 검색 부분 -->
          <div class="flex items-center">
            <!-- 지역 셀렉트 -->
            <select
              id="search-sido"
              class="form-select"
              aria-label="Default select example"
              v-model="sidoCode"
            >
              <option value="0" selected>검색 할 시, 도 선택</option>
              <option value="1">서울</option>
              <option value="2">인천</option>
              <option value="3">대전</option>
              <option value="4">대구</option>
              <option value="5">광주</option>
              <option value="6">부산</option>
              <option value="7">울산</option>
              <option value="8">세종특별자치시</option>
              <option value="31">경기도</option>
              <option value="32">강원도</option>
              <option value="33">충청북도</option>
              <option value="34">충청남도</option>
              <option value="35">경상북도</option>
              <option value="36">경상남도</option>
              <option value="37">전라북도</option>
              <option value="38">전라남도</option>
              <option value="39">제주도</option>
            </select>
            <!-- 컨텐츠 셀렉트 -->
            <select
              id="search-content-id"
              class="form-select"
              aria-label="Default select example"
              v-model="contentId"
            >
              <option value="0" selected>관광지 유형</option>
              <option value="12">관광지</option>
              <option value="14">문화시설</option>
              <option value="15">축제공연행사</option>
              <option value="25">여행코스</option>
              <option value="28">레포츠</option>
              <option value="32">숙박</option>
              <option value="38">쇼핑</option>
              <option value="39">음식점</option>
            </select>
            <!-- 검색 키워드 -->
            <input
              class="flex h-10 w-full border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border rounded-lg px-4 py-2"
              placeholder="검색"
              type="search"
              v-model="title"
            />
            <!-- 검색 버튼 -->
            <button
              :to="{ name: 'search' }"
              @click="attractionSearch"
              class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 bg-blue-500 text-white rounded-lg px-4 py-2 ml-2"
            >
              검색
            </button>
          </div>
        </div>
        <div class="flex space-x-4">
          <!-- 게시판 버튼 -->
          <button
            @click="goToBoard"
            class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 border rounded-lg"
          >
            게시판
          </button>
          <!-- 로그인 버튼 -->
          <button
            v-if="!isLoggedIn"
            @click="openLoginModal"
            class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 border rounded-lg"
          >
            로그인
          </button>
          <!-- 로그아웃 버튼 -->
          <div v-if="isLoggedIn" class="flex items-center space-x-4">
            <p class="text-sm font-medium text-gray-700 whitespace-nowrap">
              안녕하세요, {{ userInfo.userName }}님
            </p>
            <button
              @click="logout"
              class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 border rounded-lg"
            >
              로그아웃
            </button>
          </div>
          <!-- 로그인 모달 -->
          <div v-show="isLoginModalOpen">
            <LoginModal @close="closeLoginModal" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
