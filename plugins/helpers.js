import Vue from 'vue'
Vue.mixin({
  methods: {
    showBubbleMessage (type, closeable, msg) {
      this.$store.commit('messages/display', { type, closeable, msg })
    },
    clearBubbleMessages () {
      this.$store.commit('messages/clear')
    }
  }
})
