<template>
  <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div class="flex flex-1 justify-between sm:hidden">
      <button @click="previousPage" :disabled="currentPage === 1" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
        Previous
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
        Next
      </button>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{ startItem }}</span>
          to
          <span class="font-medium">{{ endItem }}</span>
          of
          <span class="font-medium">{{ totalItems }}</span>
          results
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <button @click="previousPage" :disabled="currentPage === 1" class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50" aria-label="Previous">
            <span class="sr-only">Previous</span>
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.707 14.707a1 1 0 01-1.414 0L7.293 10l4-4a1 1 0 011.414 1.414L10.414 10l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          <span v-for="page in pages" :key="page" @click="goToPage(page)" :class="{'z-10 bg-indigo-50 border-indigo-500 text-indigo-600': page === currentPage, 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50': page !== currentPage}" class="relative inline-flex items-center border px-4 py-2 text-sm font-medium cursor-pointer">
            {{ page }}
          </span>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50" aria-label="Next">
            <span class="sr-only">Next</span>
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L9.586 10 7.293 7.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
}>()

const emit = defineEmits(['update:currentPage'])

const startItem = computed(() => (props.currentPage - 1) * props.pageSize + 1)
const endItem = computed(() => Math.min(props.currentPage * props.pageSize, props.totalItems))

const pages = computed(() => {
  const pagesArray = []
  for (let i = 1; i <= props.totalPages; i++) {
    pagesArray.push(i)
  }
  return pagesArray
})

const previousPage = () => {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1)
  }
}

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('update:currentPage', props.currentPage + 1)
  }
}

const goToPage = (page: number) => {
  emit('update:currentPage', page)
}
</script>
