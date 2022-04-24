import Vue from 'vue'
Vue.mixin({
  methods: {
    showBubbleMessage (type, closeable, msg) {
      this.$store.commit('messages/display', { type, closeable, msg })
    },
    clearBubbleMessages () {
      this.$store.commit('messages/clear')
    },

    validateEmail (email) {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true
      }
      return false
    },
    addDaysToDate (date, days) {
      return this.$dateFns.addDays(date, days)
    }
  }
})
