<script setup>
import { ref, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import client from '@/api/client'

const router = useRouter()

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

// 모달 닫기
const emit = defineEmits(['close', 'isOpenSignupModal'])

const close = () => {
  emit('close')
}

const isOpenSignupModal = () => {
  emit('isOpenSignupModal')
}

// 로그인
const userId = ref('')
const userPassword = ref('')

const login = async () => {
  try {
    const response = await client.post('/members/login', {
      userId: userId.value,
      userPassword: userPassword.value
    })

    if (response.status !== 200) {
      throw new Error('로그인 실패')
    }

    sessionStorage.setItem('memberDto', JSON.stringify(response.data))

    Swal.fire({
      title: '로그인성공',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: '확인'
    }).then(() => {
      router.go(0)
    })
  } catch (error) {
    console.error('에러' + error)
    Toast.fire({
      icon: 'error',
      title: '로그인 실패'
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
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:w-full sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">로그인</h3>
              <div class="mt-2">
                <form id="loginForm" method="POST">
                  <input type="hidden" name="action" value="login" />
                  <!-- 아이디 입력 -->
                  <div class="mb-3">
                    <label for="loginUserId" class="block text-sm font-medium text-gray-700"
                      >아이디</label
                    >
                    <input
                      type="text"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border-2"
                      id="loginUserId"
                      name="loginUserId"
                      v-model="userId"
                      required
                    />
                  </div>
                  <!-- 비밀번호 입력 -->
                  <div class="mb-3">
                    <label for="loginPassword" class="block text-sm font-medium text-gray-700"
                      >비밀번호</label
                    >
                    <input
                      type="password"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border-2"
                      id="loginPassword"
                      name="loginPassword"
                      v-model="userPassword"
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <!-- 로그인 버튼 -->
          <button
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            id="loginBtn"
            @click="login"
          >
            로그인
          </button>
          <!-- 취소 버튼 -->
          <button
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            data-bs-dismiss="modal"
            @click="close"
          >
            취소
          </button>
          <!-- 회원가입 버튼 -->
          <button
            id="showSignupModalBtn"
            type="button"
            class="ml-0 mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-transparent text-base font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
            @click="isOpenSignupModal"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
