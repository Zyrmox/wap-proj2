export const state = () => ({
  file: null,
  record: null,
  uploading: false,
  stored: false
})

export const mutations = {
  load (state, file) {
    state.file = file
    this.commit('messages/clear')
  },
  store (state) {
    window.console.log('Storing to bucket: ' + state.file.name)
    state.uploading = true
  },
  doneUploading (state) {
    state.uploading = false
    state.stored = true
  },
  saveRecordFromTable (state, record) {
    state.record = record
  },
  remove (state) {
    state.file = null
  },
  reset (state) {
    state.file = null
    state.record = null
    state.uploading = false
    state.stored = false
    this.commit('messages/clear')
  }
}
