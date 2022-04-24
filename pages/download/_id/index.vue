<template>
  <box>
    <div v-if="fileInfo.fileUUID === ''" class="flex flex-col items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-32 w-32 animate-spin text-green-500 mb-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    </div>
    <div v-else class="flex flex-col items-center">
      <file-info-panel :file="fileInfo" :disabled="true" />
      <div class="flex items-center w-1/4 my-3">
        <div class="flex-grow h-1 bg-gray-400" />
      </div>

      <div class="flex justify-between items-center w-full mt-4">
        <button
          class="inline-flex items-center text-white bg-green-500 hover:bg-green-400 transition-colors duration-150 px-8 py-4 font-semibold rounded-lg"
          type="button"
          @click="startFileDownload"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Stáhnout
        </button>
      </div>
    </div>
  </box>
</template>

<script>
export default {
  data () {
    return {
      fileCode: this.$route.params.id,
      fileInfo: {
        fileUUID: '',
        fileName: '',
        fileFormat: '',
        createdAt: '',
        modifiedAt: '',
        expiresAt: '',
        hashFile: '',
        hashAdministrative: '',
        hashPreview: ''
      }
    }
  },
  created () {
    this.getFileInfo()
  },
  methods: {
    async getFileInfo () {
      try {
        const { data, error } = await this.$supabase.from('file_links')
          .select('*')
          .eq('hash_preview', this.fileCode).single()

        if (error) { throw error }

        this.fileInfo.fileUUID = data.id
        const nameAndFormat = this.getNameAndFormat(data.file_name)
        this.fileInfo.fileName = nameAndFormat.name
        this.fileInfo.fileFormat = nameAndFormat.format

        this.fileInfo.createdAt = data.created_at
        this.fileInfo.modifiedAt = data.updated_at
        this.fileInfo.expiresAt = data.expiry_at
        this.fileInfo.hashFile = data.file_hash
        this.fileInfo.hashAdministrative = data.hash_administrative
        this.fileInfo.hashPreview = data.hash_preview
      } catch (error) {
        this.$nuxt.$options.router.push('/error')
      }
    },
    getNameAndFormat (value) {
      const arr = String(value).split('.')
      const fileName = arr[0]
      arr.shift()
      const fileFormat = arr.join('.')
      return {
        name: fileName,
        format: fileFormat
      }
    },
    async startFileDownload () {
      try {
        const { data, error } = await this.$supabase.storage.from('file-bucket').download(this.fileInfo.hashFile)
        if (error) { throw error }

        const link = document.createElement('a')
        link.href = URL.createObjectURL(data)
        link.download = this.fileInfo.fileName
        link.click()
        URL.revokeObjectURL(link.href)
      } catch (error) {
        window.console.error(error)
      }
    }
  }
}
</script>
<style>

</style>
