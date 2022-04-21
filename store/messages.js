export const state = () => ({
  list: []
})

export const mutations = {
  display (state, message) {
    const hash = Math.random().toString(36).substring(7)
    state.list.push({
      id: hash,
      type: message.type,
      closeable: message.closeable,
      msg: message.msg
    })
  },
  hide (state, message) {
    state.list.splice(state.list.indexOf(message), 1)
  },
  clear (state) {
    state.list = []
  }
}
