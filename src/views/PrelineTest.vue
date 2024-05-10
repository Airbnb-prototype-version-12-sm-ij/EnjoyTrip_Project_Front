<script setup>
// import { ref } from 'vue'
import LoginModal from '@/views/modal/LoginModal.vue'

// 로그인 모달 관리
// const isLoginModalOpen = ref(false)

// const openLoginModal = () => {
//   isLoginModalOpen.value = true
// }
// const closeLoginModal = () => {
//   isLoginModalOpen.value = false
// }

// set the modal menu element

// options with default values
// const options = {
//   placement: 'bottom-right',
//   backdrop: 'dynamic',
//   backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
//   closable: true,
//   onHide: () => {
//     console.log('modal is hidden')
//   },
//   onShow: () => {
//     console.log('modal is shown')
//   },
//   onToggle: () => {
//     console.log('modal has been toggled')
//   }
// }

/*
 * $targetEl: required
 * options: optional
 */
</script>

<template>
  <!-- Modal toggle -->
  <button
    data-modal-target="authentication-modal"
    data-modal-toggle="authentication-modal"
    class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    type="button"
  >
    Toggle modal
  </button>
  <LoginModal />
</template>

<style scoped></style>
