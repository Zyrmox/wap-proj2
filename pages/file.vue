<template>
  <box>
    <div class="flex flex-col space-y-2">
      <file-info-panel :file="fileInfo" :disabled="!isEditing" />

      <div class="flex items-center w-1/4 my-3">
        <div class="flex-grow h-1 bg-gray-400" />
      </div>

      <input-link-and-copy :label="'Public link'" :url="'https://cs.wikipedia.org/wiki/Wikipedie:'+editCode" />

      <input-link-and-copy :label="'Private link'" :url="'https://cs.wikipedia.org/wiki/Wikipedie:'+editCode" />

      <div class="flex space-x-5">
        <button
          class="inline-block px-6 py-2.5 bg-yellow-600 text-white rounded hover:bg-yellow-900"
          type="button"
          @click="editBtnClicked"
        >
          edit
        </button>
        <button
          class="inline-block px-6 py-2.5 bg-gray-600 text-white rounded hover:bg-gray-900"
          type="button"
        >
          download
        </button>
        <button
          class="inline-block px-6 py-2.5 bg-red-600 text-white rounded hover:bg-red-900"
          type="button"
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
      isEditing: false,
      editCode: 'kajgkjadfkjhfkjasf',
      fileInfo: {
        name: 'ahoj',
        createdAt: '',
        modifiedAt: '',
        expiresAt: '',
        size: '20'
      }
    }
  },
  methods: {
    editBtnClicked () {
      this.isEditing = !this.isEditing
    }
  }
}
</script>

<style>
</style>
