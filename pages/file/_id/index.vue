<template>
  <box>
    <div v-if="fileInfo.fileUUID !== ''" class="flex flex-col space-y-2">
      <file-info-panel :file="fileInfo" :disabled="!isEditing" />

      <div class="flex items-center w-1/4 my-3">
        <div class="flex-grow h-1 bg-gray-400" />
      </div>

      <input-link-and-copy :label="'Public link'" :url="previewLink" />

      <input-link-and-copy v-if="editPremission" :label="'Private link'" :url="administrativeLink" />

      <div class="flex space-x-5">
        <button
          v-if="editPremission"
          class="inline-block px-6 py-2.5 bg-yellow-600 text-white rounded hover:bg-yellow-900"
          type="button"
          @click="editBtnClicked"
        >
          edit
        </button>
        <button
          class="inline-block px-6 py-2.5 bg-gray-600 text-white rounded hover:bg-gray-900"
          type="button"
          @click="startFileDownload"
        >
          download
        </button>
        <button
          v-if="editPremission"
          class="inline-block px-6 py-2.5 bg-red-600 text-white rounded hover:bg-red-900"
          type="button"
          @click="deleteConform"
        >
          delete
        </button>
      </div>
    </div>
  </box>
</template>

<script>
import Box from '~/components/Box.vue'
import FileInfoPanel from '~/components/fileInfoPanel.vue'
import InputLinkAndCopy from '~/components/inputLinkAndCopy.vue'

export default {
  components: {
    Box,
    FileInfoPanel,
    InputLinkAndCopy
  },
  data () {
    return {
      editPremission: true,
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

    async deleteConform () {
      if (window.confirm('Do you really want to delete this file?')) {
        try {
          const { error } = await this.$supabase.from('file_links')
            .delete()
            .match({ id: this.fileInfo.fileUUID })
          if (error) { throw error }
          this.fileInfo = null
        } catch (error) {
          console.error(error)
        }
      }
    },

    // TODO: pro sekci downloads tady budu jen testovat jestli je to hash_preview
    async getFileInfo () {
      const { data, error } = await this.$supabase.from('file_links')
        .select('*')
        .eq('hash_administrative', this.fileCode).single()
      if (!error) {
        this.fileInfo.fileUUID = data.id
        const nameAndFormat = this.getNameAndFormat(data.file_name)
        this.fileInfo.fileName = nameAndFormat.name
        this.fileInfo.fileFormat = nameAndFormat.format

        this.fileInfo.createdAt = data.created_at
        this.fileInfo.modifiedAt = data.updated_at
        this.fileInfo.hashFile = data.file_hash
        this.fileInfo.hashAdministrative = data.hash_administrative
        this.fileInfo.hashPreview = data.hash_preview
      }
    },

    async updateInfo () {
      try {
        const { error } = await this.$supabase.from('file_links')
          .update({ file_name: this.fileInfo.fileName + '.' + this.fileInfo.fileFormat })
          .match({ id: this.fileInfo.fileUUID })
        if (error) { throw error }
      } catch (error) {
        console.error(error)
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
        console.error(error)
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
