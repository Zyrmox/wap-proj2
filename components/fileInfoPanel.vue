<template>
  <div class="flex flex-col">
    <label class="text-green-500 font-semibold text-2xl">File name</label>
    <input
      v-model="file.name"
      :disabled="disabled"
      type="text"
      class="block p-4 w-full bg-gray-50 rounded-lg border sm:text-lg dark:placeholder-gray-400"
    >
    <div class="flex flex-row">
      <div class="flex-col flex-auto">
        <div class="text-gray-400">
          created: {{ file.createdAt }}
        </div>
        <div class="text-gray-400">
          modified: {{ file.modifiedAt }}
        </div>
        <div class="text-gray-400">
          expires: {{ file.expiresAt }}
        </div>
      </div>
      <div class="flex-col flex-auto">
        <div class="text-gray-400">
          size: {{ file.size }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['file', 'disabled']
}
</script>

<style>
</style>
