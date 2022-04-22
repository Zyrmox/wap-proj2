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
        <div v-else-if="fileUploaded && !stored" class="flex flex-col items-center">
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

        <div v-else class="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-32 w-32 text-green-500 mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>

          <div class="text-green-500 font-semibold text-2xl">
            Úspěšně nahrán soubor: {{ file.name }}
          </div>

          <div class="mt-6 mb-2 w-full">
            <div class="flex">
              <span class="inline-flex items-center px-3 py-2 text-white bg-gray-700 rounded-l-lg border-2 border-r-0 border-gray-700 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                Odkaz pro sdílení
              </span>
              <div class="inline-flex items-center rounded-none pl-4 bg-gray-50 border-2 border-r-0 text-gray-900 focus:ring-blue-500 focus:border-blue-500 flex-1 min-w-0 w-full text-sm border-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {{ previewLink }}
              </div>
              <button class="inline-flex items-center px-3 py-2 text-white font-semibold bg-green-500 rounded-none rounded-r-lg border-2 border-l-0 border-green-500 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
                </svg>
                Kopírovat
              </button>
            </div>
          </div>

          <button class="inline-flex items-center text-white bg-green-500 px-8 py-4 font-semibold rounded-lg mt-6" @click="resetUpload">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
            </svg>
            Nahrát jiný soubor
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
      'record',
      'uploading',
      'stored'
    ]),
    fileUploaded () {
      return this.file != null
    },
    previewLink () {
      return process.env.baseUrl + '/download/' + this.record.hash_preview
    }
  },
  created () {
    this.$nuxt.$on('dropAreaUploadSuccessful', $files => this.loadFile($files))
  },
  methods: {
    loadFile (files) {
      if (this.stored) {
        return
      }
      const f = files[0]
      this.$store.commit('upload/load', f)
    },
    filePicked (e) {
      if (this.stored) {
        return
      }
      const files = e.target.files
      this.loadFile(files)
    },
    async storeFile () {
      if (this.stored) {
        return
      }

      this.$store.commit('upload/store')
      const fHash = this.genHash(this.file.name + this.genUUID())

      const { data, error } = await this.$supabase.storage.from('file-bucket').upload(fHash, this.file)
      window.console.log(data, error)

      if (!error) {
        if (data) {
          const returnedData = data.Key.split('/')
          const key = { bucket: returnedData[0], name: returnedData[1] }

          const record = await this.storeToTable(fHash)
          this.$store.commit('upload/saveRecordFromTable', record[0])

          this.$store.commit('upload/doneUploading', key)
          this.showBubbleMessage('success', true, 'Váš soubor byl úspěšně nahrán.')
        }
      } else {
        this.showBubbleMessage('error', true, 'Chyba při nahrávání souboru. Zkuste prosím opakovat později.')
      }
    },
    async storeToTable (fileHash) {
      const previeHash = this.genHash(this.file.name + this.genUUID())
      const administrativeHash = this.genHash(this.file.name + this.genUUID())
      /* Insert into file_links table a record about the bucket storage upload */
      const { data, error } = await this.$supabase.from('file_links').insert([
        {
          id: this.genUUID(),
          file_name: this.file.name,
          file_hash: fileHash,
          hash_preview: previeHash,
          hash_administrative: administrativeHash,
          created_at: new Date().toISOString()
        }
      ])

      if (data && !error) {
        return data
      }
      this.showBubbleMessage('error', true, 'Chyba při nahrávání souboru. Zkuste prosím opakovat později.')
    },
    ...mapMutations({
      removeFile: 'upload/remove',
      resetUpload: 'upload/reset'
    })
  }
}
</script>
