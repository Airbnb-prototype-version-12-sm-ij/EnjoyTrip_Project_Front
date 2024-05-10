<script setup>
import { ref, defineEmits, computed } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import client from '@/api/client'

const router = useRouter()

// 모달 닫기
const emit = defineEmits(['close'])
const close = () => {
  emit('close')
}

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

// 비밀번호 보이기
const showPassword = ref(false)

const passwordType = computed(() => {
  return showPassword.value ? 'text' : 'password'
})

// 유효성 검사
const userPattern = /^[A-Za-z0-9]{3,15}$/

// 아이디 유효성 검사
const isUserIdValid = computed(() => userPattern.test(userId.value))
const idWarningMessage = computed(() =>
  isUserIdValid.value ? '' : '아이디는 영어와 숫자를 함께 사용하여 3-15자리여야 합니다.'
)

// 비밀번호 유효성 검사
const isUserPasswordValid = computed(() => userPattern.test(userPassword.value))
const passwordWarningMessage = computed(() =>
  isUserPasswordValid.value ? '' : '비밀번호는 영어와 숫자를 함께 사용하여 3-15자리여야 합니다.'
)

// 비밀번호 확인 유효성 검사
const isConfirmPasswordValid = computed(() => userPassword.value === confirmPassword.value)
const confirmPasswordWarningMessage = computed(() =>
  isConfirmPasswordValid.value ? '' : '비밀번호가 일치하지 않습니다.'
)

// 이름 유효성 검사
const userNamePattern = /^[가-힣]+$/
const isUserNameValid = computed(() => userNamePattern.test(userName.value))
const userNameWarningMessage = computed(() =>
  isUserNameValid.value ? '' : '이름은 한글만 입력 가능합니다.'
)

// 회원가입
const userId = ref('')
const userPassword = ref('')
const userName = ref('')

const confirmPassword = ref('')

const signup = async () => {
  try {
    if (userId.value === '' || userPassword.value === '' || userName.value === '') {
      Swal.fire({
        icon: 'warning',
        title: '회원가입 실패',
        text: '모든 항목을 입력해주세요.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: '확인'
      })
      return
    }

    if (userPassword.value !== confirmPassword.value) {
      Swal.fire({
        icon: 'warning',
        title: '회원가입 실패',
        text: '비밀번호가 일치하지 않습니다.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: '확인'
      })
      return
    }

    const response = await client.post('/members/join', {
      userId: userId.value,
      userPassword: userPassword.value,
      userName: userName.value
    })

    if (response.status !== 200) {
      throw new Error('회원가입 실패')
    }

    Swal.fire({
      title: '회원가입 성공',
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
      title: '회원가입 실패'
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
        <div class="bg-white px-2 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:w-full sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                회원 가입
              </h3>
              <div class="mt-2">
                <form id="signupForm" method="POST" action="/members/join">
                  <input type="hidden" name="action" value="regist" />
                  <!-- 아이디 입력 -->
                  <div class="mb-3">
                    <label for="userId" class="block text-sm font-medium text-gray-700"
                      >아이디</label
                    >
                    <input
                      type="text"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border-2"
                      id="userId"
                      name="userId"
                      v-model="userId"
                      required
                    />
                    <div class="text-red-300 text-xs" v-if="idWarningMessage">
                      {{ idWarningMessage }}
                    </div>
                  </div>
                  <!-- 비밀번호 입력 -->
                  <div class="mb-3">
                    <label for="password" class="block text-sm font-medium text-gray-700"
                      >비밀번호</label
                    >
                    <input
                      :type="passwordType"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border-2"
                      id="password"
                      name="password"
                      v-model="userPassword"
                      required
                    />
                    <div class="text-red-300 text-xs" v-if="passwordWarningMessage">
                      {{ passwordWarningMessage }}
                    </div>
                  </div>
                  <!-- 비밀번호 확인 -->
                  <div class="mb-3">
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700"
                      >비밀번호 확인</label
                    >
                    <input
                      :type="passwordType"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border-2"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      required
                    />
                    <div class="text-red-300 text-xs" v-if="confirmPasswordWarningMessage">
                      {{ confirmPasswordWarningMessage }}
                    </div>
                  </div>
                  <!-- 비밀번호 show box -->
                  <div class="mb-3 form-check">
                    <input
                      v-model="showPassword"
                      type="checkbox"
                      class="form-check-input"
                      id="showPasswordCheckbox"
                    />
                    <label class="form-check-label" for="showPasswordCheckbox"
                      >비밀번호 보이기</label
                    >
                  </div>
                  <!-- 이름 입력 -->
                  <div class="mb-3">
                    <label for="name" class="block text-sm font-medium text-gray-700">이름</label>
                    <input
                      type="text"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border-2"
                      id="name"
                      name="name"
                      v-model="userName"
                      required
                    />
                    <div class="text-red-300 text-xs" v-if="userNameWarningMessage">
                      {{ userNameWarningMessage }}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <!-- 회원가입 버튼 -->
          <button
            id="registBtn"
            type="submit"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            @click="signup"
          >
            회원 가입
          </button>
          <!-- 취소 버튼 -->
          <button
            @click="close"
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            data-bs-dismiss="modal"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
