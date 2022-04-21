<template>
  <div>
    <drop-area :enabled="!fileUploaded">
      <div class="border-4 border-dashed border-green-500 rounded-xl p-4 sm:p-8">
        <div v-if="!fileUploaded" class="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-32 w-32 text-green-500 mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <div class="text-green-500 font-semibold text-2xl">
            Přetáhněte soubor
          </div>
          <div class="flex items-center w-1/4 my-3">
            <div class="flex-grow h-1 bg-gray-400" />
            <div class="flex-grow-0 text-gray-400 px-4 font-medium">
              nebo
            </div>
            <div class="flex-grow h-1 bg-gray-400" />
          </div>
          <div>
            <input type="file" class="text-white bg-green-500 px-4 py-2 font-semibold" placeholder="Procházet soubory" @change="filePicked">
          </div>
        </div>
        <div v-else class="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-32 w-32 text-green-500 mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>

          <div class="text-green-500 font-semibold text-2xl">
            {{ file.name }}
          </div>

          <button class="text-white bg-green-500 px-4 py-2 font-semibold rounded-lg mt-6" @click="storeFile">
            <span v-if="!uploading">Nahrát soubor</span>
            <span v-else>Nahrávání....</span>
          </button>

          <div class="flex items-center w-1/4 my-3">
            <div class="flex-grow h-1 bg-gray-400" />
            <div class="flex-grow-0 text-gray-400 px-4 font-medium">
              nebo
            </div>
            <div class="flex-grow h-1 bg-gray-400" />
          </div>

          <button class="text-green-500 px-4 py-2 font-semibold" @click="removeFile">
            Zvolit jiný soubor
          </button>
        </div>
      </div>
    </drop-area>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('upload', [
      'file',
      'uploading'
    ]),
    fileUploaded () {
      return this.file != null
    }
  },
  created () {
    this.$nuxt.$on('dropAreaUploadSuccessful', $files => this.loadFile($files))
  },
  methods: {
    loadFile (files) {
      const f = files[0]
      this.$store.commit('upload/load', f)
    },
    filePicked (e) {
      const files = e.target.files
      this.loadFile(files)
    },
    async storeFile () {
      const fName = this.file.name
      const { data, error } = await this.$supabase.storage.from('file-bucket').upload(fName, this.file)
      window.console.log(data, error)
      if (!error) {
        if (data) {
          this.$store.commit('upload/doneUploading')
          window.console.log(data)
        }
      } else {
        this.showBubbleMessage('error', true, 'Chyba při nahrávání souboru. Zkuste prosím opakovat později.')
      }
    },
    ...mapMutations({
      removeFile: 'upload/remove'
    })
  }
}
</script>
