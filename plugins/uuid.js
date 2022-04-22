import Vue from 'vue'
import { v1 as uuid } from 'uuid'
import { sha256 } from 'js-sha256'

Vue.mixin({
  methods: {
    genUUID () {
      return uuid()
    },
    genHash (msg) {
      return sha256(msg)
    }
  }
})
