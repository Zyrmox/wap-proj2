export const state = () => ({
  file: null,
  record: null,
  uploading: false,
  stored: false,
  name: null,
  email: null
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
    this.commit('messages/clear')
  },
  saveRecordFromTable (state, record) {
    state.record = record
  },
  updateName (state, val) {
    state.name = val
  },
  updateEmail (state, val) {
    state.email = val
  },
  remove (state) {
    state.file = null
  },
  reset (state) {
    state.file = null
    state.record = null
    state.uploading = false
    state.stored = false
    state.name = null
    state.email = null
    this.commit('messages/clear')
  }
}
