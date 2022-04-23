<template>
  <div class="flex flex-col w-full">
    <label class="text-green-500 font-semibold text-2xl">File name</label>
    <input
      v-model="file.fileName"
      :disabled="disabled"
      type="text"
      class="block p-4 w-full bg-gray-50 rounded-lg border sm:text-lg dark:placeholder-gray-400"
    >
    <div class="flex flex-row">
      <div class="flex-col flex-auto">
        <div class="text-gray-400">
          created: {{ formateDate(file.createdAt) }}
        </div>
        <div class="text-gray-400">
          modified: {{ formateDate(file.modifiedAt) }}
        </div>
        <div class="text-gray-400">
          expires:
        </div>
      </div>
      <div class="flex-col flex-auto">
        <div class="text-gray-400">
          format: {{ file.fileFormat }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['file', 'disabled'],
  methods: {
    formateDate (date) {
      return (date == null ? 'Never' : new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }))
    }
  }
}
</script>

<style>
</style>
