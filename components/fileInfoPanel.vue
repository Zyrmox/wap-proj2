<template>
  <div class="flex flex-row w-full items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-40 w-40 text-green-500 m-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
    <div class="flex flex-col w-full">
      <label class="text-green-500 font-semibold text-2xl">Název souboru:</label>
      <input
        v-model="file.fileName"
        :disabled="disabled"
        type="text"
        class="block p-4 w-full bg-gray-50 border-0 border-b-2
      focus:border-green-500 focus:ring-0 focus:outline-none
      sm:text-lg
      dark:placeholder-gray-400"
      >
      <div class="flex flex-row">
        <div class="flex-col flex-auto">
          <div class="text-gray-400">
            autor: {{ file.fileAuthor }}
          </div>
          <div class="text-gray-400">
            vytvořeno: {{ formateDate(file.createdAt) }}
          </div>
          <div class="text-gray-400">
            upraveno: {{ formateDate(file.modifiedAt) }}
          </div>
          <div class="text-gray-400">
            expiruje za: {{ expiration }} dní
          </div>
        </div>
        <div class="flex-col flex-auto">
          <div class="text-gray-400">
            email autora: {{ file.fileAuthorEmail }}
          </div>
          <div class="text-gray-400">
            formát: {{ file.fileFormat }}
          </div>
          <div class="text-gray-400">
            počet stažení: {{ file.downloadCount }} x
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['file', 'disabled'],
  computed: {
    expiration () {
      return this.dateToDays(this.file.expiresAt)
    }
  },
  created () {
  },
  methods: {
    formateDate (date) {
      return (date == null ? 'Nikdy' : new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }))
    },
    dateToDays (value) {
      const date = new Date(value)
      const today = new Date()

      const differenceInTime = date.getTime() - today.getTime()
      const differenceInDays = differenceInTime / (1000 * 3600 * 24)

      return Math.trunc(differenceInDays)
    }
  }
}
</script>

<style>
</style>
