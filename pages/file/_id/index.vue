<template>
  <box>
    <div v-if="fileInfo === null" class="flex flex-col items-center w-full">
      Soubor úspěšně odstraněn
    </div>
    <div v-else-if="fileInfo.fileUUID === ''" class="flex flex-col items-center w-full">
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
    <div v-else class="flex flex-col items-center w-full">
      <file-info-panel :file="fileInfo" :disabled="!isEditing" />

      <div class="flex items-center w-full my-3 mt-">
        <div class="flex-grow h-px bg-green-500 rounded" />
      </div>

      <div class="bg-gray-200 mt-2 px-4 py-4 sm:px-8 sm:py-6 rounded-lg w-full">
        <input-link-and-copy :label="'Public link'" :url="previewLink" class="mt-2" />

        <input-link-and-copy :label="'Private link'" :url="administrativeLink" class="mt-2" />
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
          Stáhnout soubor
        </button>
        <div class="inline-flex items-center space-x-2">
          <button
            v-if="isEditing"
            class="inline-flex items-center text-white bg-green-500 hover:bg-green-400 transition-colors duration-150 px-8 py-4 font-semibold rounded-lg"
            type="button"
            @click="extendBtnClicked"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Prodloužit o 7 dní
          </button>

          <button
            class="inline-flex items-center text-orange-400 border-orange-400 border bg-white hover:bg-orange-400 hover:text-white transition-colors duration-150 px-8 py-4 font-semibold rounded-lg"
            type="button"
            @click="editBtnClicked"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Upravit
          </button>

          <button
            class="inline-flex items-center text-red-400 border-red-400 border bg-white hover:bg-red-400 hover:text-white transition-colors duration-150 px-8 py-4 font-semibold rounded-lg"
            type="button"
            @click="deleteConform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Smazat
          </button>
        </div>
      </div>
    </div>
  </box>
</template>

<script>

export default {
  data () {
    return {
      isEditing: false,
      fileCode: this.$route.params.id,
      fileInfo: {
        fileUUID: '',
        fileName: '',
        fileFormat: '',
        fileAuthor: '',
        fileAuthorEmail: '',
        downloadCount: 0,
        createdAt: '',
        modifiedAt: '',
        expiresAt: '',
        hashFile: '',
        hashAdministrative: '',
        hashPreview: ''
      }
    }
  },
  computed: {
    previewLink () {
      return process.env.baseUrl + '/download/' + this.fileInfo.hashPreview
    },
    administrativeLink () {
      return process.env.baseUrl + '/file/' + this.fileInfo.hashAdministrative
    },
    fileFormat () {
      return (this.fileInfo.fileFormat === '' ? '' : '.' + this.fileInfo.fileFormat)
    }
  },
  created () {
    this.getFileInfo()
  },
  methods: {
    editBtnClicked () {
      if (this.isEditing) { // end editing
        this.updateInfo()
      }
      this.isEditing = !this.isEditing
    },
    extendBtnClicked () {
      if (this.isEditing) { // end editing
        const oldDate = new Date(this.fileInfo.expiresAt)
        const newDate = this.addDaysToDate(oldDate, 7)
        this.fileInfo.expiresAt = newDate
        this.updateExpiration()
      }
    },

    async deleteConform () {
      if (window.confirm('Do you really want to delete this file?')) {
        try {
          const { error } = await this.$supabase.from('file_links')
            .delete()
            .match({ id: this.fileInfo.fileUUID })
          if (error) { throw error }
          this.fileInfo = null
        } catch (error) {
          window.console.error(error)
        }
      }
    },

    // TODO: pro sekci downloads tady budu jen testovat jestli je to hash_preview
    async getFileInfo () {
      try {
        const { data, error } = await this.$supabase.from('file_links')
          .select('*')
          .eq('hash_administrative', this.fileCode).single()
        if (error) { throw error }
        this.fileInfo.fileUUID = data.id
        const nameAndFormat = this.getNameAndFormat(data.file_name)
        this.fileInfo.fileName = nameAndFormat.name
        this.fileInfo.fileFormat = nameAndFormat.format

        this.fileInfo.fileAuthor = data.author_name
        this.fileInfo.fileAuthorEmail = data.author_email
        this.fileInfo.downloadCount = Number(data.downloads_count)
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

    async updateInfo () {
      try {
        const now = new Date()
        const { error } = await this.$supabase.from('file_links')
          .update({
            file_name: this.fileInfo.fileName + '.' + this.fileInfo.fileFormat,
            updated_at: now
          })
          .match({ id: this.fileInfo.fileUUID })
        if (error) { throw error }
        this.fileInfo.modifiedAt = now
      } catch (error) {
        window.console.error(error)
      }
    },
    async updateExpiration () {
      try {
        const { error } = await this.$supabase.from('file_links')
          .update({ expiry_at: this.fileInfo.expiresAt })
          .match({ id: this.fileInfo.fileUUID })
        if (error) { throw error }
      } catch (error) {
        window.console.error(error)
      }
    },
    async updateDownloadsCount () {
      try {
        const { error } = await this.$supabase.from('file_links')
          .update({ downloads_count: this.fileInfo.downloadCount + 1 })
          .match({ id: this.fileInfo.fileUUID })
        if (error) { throw error }
        this.fileInfo.downloadCount += 1
      } catch (error) {
        window.console.error(error)
      }
    },
    async startFileDownload () {
      try {
        const { data, error } = await this.$supabase.storage.from('file-bucket').download(this.fileInfo.hashFile)
        if (error) { throw error }

        const link = document.createElement('a')
        link.href = URL.createObjectURL(data)
        link.download = this.fileInfo.fileName + this.fileFormat
        link.click()
        URL.revokeObjectURL(link.href)
        this.updateDownloadsCount()
      } catch (error) {
        window.console.error(error)
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
    }

  }
}
</script>

<style>
</style>
