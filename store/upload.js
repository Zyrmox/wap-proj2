export const state = () => ({
  file: null,
  uploading: false,
  stored: false,
  failed: false
})

export const mutations = {
  load (state, file) {
    state.file = file
  },
  store (state) {
    window.console.log('Storing to bucket: ' + state.file.name)
    state.uploading = true
  },
  doneUploading (state) {
    state.uploading = false
  },
  remove (state) {
    state.file = null
  }
}
