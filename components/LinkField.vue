<template>
  <div class="flex">
    <span class="inline-flex items-center px-3 py-2 text-white bg-gray-700 rounded-l-lg border-2 border-r-0 border-gray-700 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
      Odkaz pro sdílení
    </span>
    <div class="inline-flex items-center rounded-none pl-4 bg-gray-50 border-2 border-r-0 truncate focus:ring-blue-500 focus:border-blue-500 flex-1 min-w-0 w-full text-sm border-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      {{ previewLink }}
    </div>
    <button class="inline-flex items-center px-3 py-2 text-white font-semibold bg-green-500 rounded-none rounded-r-lg border-2 border-l-0 border-green-500 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
      </svg>
      Kopírovat
    </button>
  </div>
</template>

<script>
export default {
  props: {
    prepend: {
      required: false,
      type: String
    },
    append: {
      required: false
    }
  }
}
</script>

<style>
</style>
