<template>
  <div class="flex items-center justify-center h-screen bg-indigo-100">
    <div class="bg-indigo-300 rounded-2xl border shadow-x1 p-10 w-3/4 max-w-2xl">
      <div class="flex flex-col items-center space-y-4">
        <h1 class="font-bold text-2xl text-gray-700 w-4/6 text-center">
          Upload file
        </h1>

        <input id="user_avatar" class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" type="file">

        <div class="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full" role="status">
          <span class="visually-hidden">o</span>
        </div>

        <button class="bg-gray-800 text-white rounded-md hover:bg-gray-900 font-semibold px-4 py-3 w-full">
          Upload
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  }
}
</script>

<style>
</style>
