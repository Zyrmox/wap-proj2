<template>
  <box>
    <div v-if="fileInfo === null" class="flex flex-col items-center space-y-2 w-full">
      Soubor úspěšně odstraněn
    </div>
    <div v-else-if="fileInfo.fileUUID === ''" class="flex flex-col items-center space-y-2 w-full">
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
    <div v-else class="flex flex-col items-center space-y-2 w-full">
      <file-info-panel :file="fileInfo" :disabled="!isEditing" />

      <div class="flex items-center w-1/4 my-3">
        <div class="flex-grow h-1 bg-gray-400" />
      </div>
      <input-link-and-copy :label="'Public link'" :url="previewLink" />

      <input-link-and-copy :label="'Private link'" :url="administrativeLink" />

      <div class="flex space-x-5">
        <button
          v-if="isEditing"
          class="inline-block px-6 py-2.5 bg-green-500 text-white rounded hover:bg-yellow-900"
          type="button"
          @click="extendBtnClicked"
        >
          Prodloužit o 7 dní
        </button>
        <button
          class="inline-block px-6 py-2.5 bg-yellow-600 text-white rounded hover:bg-yellow-900"
          type="button"
          @click="editBtnClicked"
        >
          Upravit
        </button>
        <button
          class="inline-block px-6 py-2.5 bg-gray-600 text-white rounded hover:bg-gray-900"
          type="button"
          @click="startFileDownload"
        >
          Stáhnout
        </button>
        <button
          class="inline-block px-6 py-2.5 bg-red-600 text-white rounded hover:bg-red-900"
          type="button"
          @click="deleteConform"
        >
          Smazat
        </button>
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
        const oldDate = Date
        const newDate = new Date()
        newDate.setDate(today.getDate() + 1)
        this.fileInfo.expiresAt = newDate
        console.log(this.fileInfo.expiresAt)
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
        const { error } = await this.$supabase.from('file_links')
          .update({ file_name: this.fileInfo.fileName + '.' + this.fileInfo.fileFormat })
          .match({ id: this.fileInfo.fileUUID })
        if (error) { throw error }
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
