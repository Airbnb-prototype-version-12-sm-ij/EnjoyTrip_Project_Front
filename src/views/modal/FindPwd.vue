<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
// import client from '@/api/client'

// const router = useRouter()

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

const userId = ref('')
const userEmail = ref('')
</script>

<template>
  <a
    data-modal-hide="login-modal"
    data-modal-target="findpwd-modal"
    data-modal-toggle="findpwd-modal"
    type="button"
    class="text-sm text-blue-700 hover:underline dark:text-blue-500"
  >
    Find Password
  </a>
  <teleport to="body">
    <div
      id="findpwd-modal"
      tabindex="-1"
      aria-hidden="true"
      class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full min-h-full"
    >
      <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Find Password</h3>
            <button
              type="button"
              class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="findpwd-modal"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <div class="p-4 md:p-5">
            <form class="space-y-4" action="#">
              <div>
                <!-- 아이디 입력 -->
                <input
                  v-model="userId"
                  type="userId"
                  name="userId"
                  id="new-userId"
                  class="text-sm rounded-lg block w-full p-2.5 bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-green-500"
                  placeholder="ID"
                  required
                />
              </div>

              <div>
                <!-- 이메일 입력 -->
                <input
                  v-model="userEmail"
                  type="email"
                  name="userEmail"
                  id="userEmail"
                  placeholder="Email"
                  class="text-sm rounded-lg block w-full p-2.5 bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-green-500"
                  required
                />
              </div>
              <button
                @click="findpwd"
                type="submit"
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                FindPassword
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped></style>
