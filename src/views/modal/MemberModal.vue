<script setup>
import { defineEmits, onMounted } from 'vue'
import client from '@/api/client'
import Swal from 'sweetalert2'

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

// emit
const emit = defineEmits(['close'])

const close = () => {
  const memberList = document.getElementById('memberList')
  memberList.innerHTML = ''
  emit('close')
}

// 멤버 리스트 얻기
const memberList = async () => {
  const response = await client.get('/members/info')
  const memberItems = response.data
  const memberList = document.getElementById('memberList')
  memberItems.forEach((member) => {
    const memberDiv = document.createElement('div')
    memberDiv.classList.add('grid', 'grid-cols-5', 'gap-4', 'space-y-4')
    const nameDiv = document.createElement('div')
    nameDiv.classList.add('col-span-1', 'flex', 'justify-center', 'items-center', 'mt-4')
    nameDiv.textContent = member.userName
    const idDiv = document.createElement('div')
    idDiv.classList.add('col-span-1', 'flex', 'justify-center', 'items-center')
    idDiv.textContent = member.userId
    const gradeDiv = document.createElement('div')
    gradeDiv.classList.add('col-span-1', 'flex', 'justify-center', 'items-center')
    gradeDiv.textContent = member.grade
    const dateDiv = document.createElement('div')
    dateDiv.classList.add('col-span-1', 'flex', 'justify-center', 'items-center')
    dateDiv.textContent = member.registration_date
    const deleteDiv = document.createElement('div')
    deleteDiv.classList.add('col-span-1', 'flex', 'justify-center', 'items-center')
    const deleteButton = document.createElement('button')
    deleteButton.classList.add(
      'bg-red-500',
      'hover:bg-red-700',
      'text-white',
      'font-bold',
      'py-2',
      'px-4',
      'rounded',
      'focus:outline-none',
      'focus:shadow-outline'
    )

    // {
    //   "userId": "userId_b224f657f36d"
    // }
    deleteButton.textContent = '삭제'
    deleteButton.addEventListener('click', async () => {
      const response = await client.post('/members/delete', {
        userId: member.userId
      })

      if (response.status === 200) {
        memberList.removeChild(memberDiv)
        Toast.fire({
          icon: 'success',
          title: '회원 삭제 성공'
        })
      }
    })

    deleteDiv.appendChild(deleteButton)
    memberDiv.appendChild(nameDiv)
    memberDiv.appendChild(idDiv)
    memberDiv.appendChild(gradeDiv)
    memberDiv.appendChild(dateDiv)
    memberDiv.appendChild(deleteDiv)
    memberList.appendChild(memberDiv)
  })
}
// 마운트 될때
onMounted(() => {
  memberList()
})
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
          <h5 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">회원 관리</h5>
          <div class="mt-2">
            <div class="grid grid-cols-5 gap-4">
              <div class="col-span-1 flex justify-center items-center">이름</div>
              <div class="col-span-1 flex justify-center items-center">아이디</div>
              <div class="col-span-1 flex justify-center items-center">등급</div>
              <div class="col-span-1 flex justify-center items-center">가입 일시</div>
              <div class="col-span-1 flex justify-center items-center">회원 삭제</div>
            </div>
            <div id="memberList"></div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            @click="close"
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
