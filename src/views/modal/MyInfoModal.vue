<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import client from '@/api/client'

const router = useRouter()

const userName = ref('')
const userId = ref('')
const grade = ref('')

// 로그인 유저 정보 가져오기
onMounted(() => {
  const memberDto = JSON.parse(sessionStorage.getItem('memberDto'))
  if (memberDto === null) {
    Swal.fire({
      title: '로그인이 필요합니다',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: '확인'
    }).then(() => {
      router.go(-1)
    })
  } else {
    userName.value = memberDto.userName
    userId.value = memberDto.userId
    grade.value = memberDto.grade
  }
})

// emit
const emit = defineEmits(['close', 'isOpenMemberModal'])

const close = () => {
  emit('close')
}

const memberManage = () => {
  emit('isOpenMemberModal')
}

// 비밀번호 보이기
const showPassword = ref(false)

const passwordType = computed(() => {
  return showPassword.value ? 'text' : 'password'
})

// 유효성 검사
const userPattern = /^[A-Za-z0-9]{3,15}$/

// 비밀번호 유효성 검사
const userPassword = ref('')
const confirmPassword = ref('')

const isUserPasswordValid = computed(() => userPattern.test(userPassword.value))
const passwordWarningMessage = computed(() =>
  isUserPasswordValid.value ? '' : '비밀번호는 영어와 숫자를 함께 사용하여 3-15자리여야 합니다.'
)

// 비밀번호 확인 유효성 검사
const isConfirmPasswordValid = computed(() => userPassword.value === confirmPassword.value)
const confirmPasswordWarningMessage = computed(() =>
  isConfirmPasswordValid.value ? '' : '비밀번호가 일치하지 않습니다.'
)

// 비밀번호 변경
const modifyPassword = async () => {
  try {
    if (!isUserPasswordValid.value || userPassword.value === '') {
      Swal.fire({
        title: '비밀번호는 영어와 숫자를 함께 사용하여 3-15자리여야 합니다.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: '확인'
      })
      return
    }

    if (!isConfirmPasswordValid.value || confirmPassword.value === '') {
      Swal.fire({
        title: '비밀번호가 일치하지 않습니다.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: '확인'
      })
      return
    }

    const response = await client.post('/members/modify', {
      userPassword: userPassword.value
    })

    if (response.status !== 200) {
      throw new Error('비밀번호 변경 실패')
    }

    Swal.fire({
      title: '비밀번호 변경 성공',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: '확인'
    }).then(() => {
      close()
    })
  } catch (error) {
    console.error('에러' + error)
    Swal.fire({
      icon: 'error',
      title: '비밀번호 변경 실패',
      confirmButtonColor: '#3085d6',
      confirmButtonText: '확인'
    })
  }
}

// 회원 탈퇴
const withdraw = async () => {
  try {
    const response = await client.post('/members/withdraw')

    if (response.status !== 200) {
      Swal.fire({
        icon: 'error',
        title: '회원 탈퇴 실패',
        confirmButtonColor: '#3085d6',
        confirmButtonText: '확인'
      })
      return
    }

    await client.post('/members/logout')
    sessionStorage.removeItem('memberDto')

    Swal.fire({
      title: '회원 탈퇴 성공',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: '확인'
    }).then(() => {
      router.go(0)
    })
  } catch (error) {
    console.error('에러' + error)
    Swal.fire({
      icon: 'error',
      title: '회원 탈퇴 실패',
      confirmButtonColor: '#3085d6',
      confirmButtonText: '확인'
    })
  }
}
</script>

<template>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h5 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">마이 페이지</h5>
          <div class="mt-2">
            <form id="MyPageForm" @submit.prevent="modifyPassword">
              <!-- my page form이 들어가는 자리 -->
              <div class="mb-3">이름: {{ userName }}</div>
              <div class="mb-3">아이디: {{ userId }}</div>
              <div class="mb-3">
                <label for="newPassword" class="block text-sm font-medium text-gray-700"
                  >새 비밀번호</label
                >
                <input
                  :type="passwordType"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  id="newPassword"
                  v-model="userPassword"
                />
                <div class="text-red-300 text-xs" v-if="passwordWarningMessage">
                  {{ passwordWarningMessage }}
                </div>
              </div>
              <div class="mb-3">
                <label for="confirmNewPassword" class="block text-sm font-medium text-gray-700"
                  >새 비밀번호 확인</label
                >
                <input
                  :type="passwordType"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  id="confirmNewPassword"
                  v-model="confirmPassword"
                />
                <div class="text-red-300 text-xs" v-if="confirmPasswordWarningMessage">
                  {{ confirmPasswordWarningMessage }}
                </div>
              </div>
              <div class="mb-3 flex items-center">
                <input
                  v-model="showPassword"
                  type="checkbox"
                  class="form-checkbox h-5 w-5 text-indigo-600"
                  id="showNewPasswordCheckbox"
                />
                <label class="ml-2 block text-sm text-gray-900" for="showNewPasswordCheckbox"
                  >비밀번호 보이기</label
                >
              </div>
              <button
                id="password-chg-btn"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                type="submit"
              >
                비밀번호 변경
              </button>
            </form>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
          <button
            v-if="grade === 'admin'"
            id="Membership-Withdrawal-btn"
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-300 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            @click="memberManage"
          >
            회원 관리
          </button>
          <div class="sm:ml-auto sm:flex sm:flex-row-reverse">
            <button
              id="Membership-Withdrawal-btn"
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              @click="withdraw"
            >
              탈퇴
            </button>
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="close"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
