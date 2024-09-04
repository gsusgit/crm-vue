<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  alert: {
    type: Object,
    required: true,
  },
})

const isVisible = ref(true)

const { type, message, link, page } = props.alert

const closeAlert = () => {
  isVisible.value = false
}

onMounted(() => {
  setTimeout(() => {
    isVisible.value = false
  }, 3000)
})
</script>

<template>
  <div v-if="isVisible"
       :class="{
      'bg-red-100 border-red-400 text-red-700': type === 'error',
      'bg-yellow-100 border-yellow-400 text-yellow-700': type === 'warning',
      'bg-teal-100 border-teal-400 text-teal-700': type === 'success'
    }"
       class="flex items-center p-4 mb-4 rounded-lg"
       role="alert"
  >
    <svg
        :class="{
        'text-red-800': type === 'error',
        'text-yellow-800': type === 'warning',
        'text-teal-800': type === 'success'
      }"
        class="flex-shrink-0 w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
    >
      <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
      />
    </svg>
    <span class="sr-only">Info</span>
    <div class="ms-3 text-sm font-medium">
      {{ message }}
      <a v-if="type === 'success' && link"
         :href="link"
         class="font-semibold underline hover:no-underline"
         target="_self"
         rel="noopener noreferrer">
        Volver al {{ page }}
      </a>
    </div>
    <button
        @click="closeAlert"
        :class="{
        'bg-red-100 text-red-500 hover:bg-red-200 ': type === 'error',
        'bg-yellow-100 text-yellow-500 hover:bg-yellow-200 ': type === 'warning',
        'bg-teal-100 text-teal-500 hover:bg-teal-200 ': type === 'success'
      }"
        type="button"
        class="ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8"
        aria-label="Close"
    >
      <span class="sr-only">Close</span>
      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    </button>
  </div>
</template>
