<template>
  <div @dragover.prevent @drop.prevent="onDrop">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    enabled: {
      required: true,
      type: Boolean
    },
    limit: {
      required: false,
      type: Number,
      default: 1
    },
    maxSize: {
      required: false,
      type: Number,
      default: 50e6
    }
  },
  data () {
    return {
      files: []
    }
  },
  methods: {
    onDrop (e) {
      if (!e.dataTransfer.files || !this.enabled) {
        return
      }
      const uploadedFiles = [...e.dataTransfer.files]
      if (this.validateLimit(uploadedFiles) && this.validateMaxSize(uploadedFiles[0])) {
        this.files = uploadedFiles
        this.$nuxt.$emit('dropAreaUploadSuccessful', this.files) // emit files to the parent component
      } else {
        this.$nuxt.$emit('dropAreaUploadFailed')
      }
    },
    validateLimit (arr) {
      if (arr.length > this.limit) {
        this.showBubbleMessage('error', true, `Maximální povolený počet nahraných souborů je: ${this.limit}`)
        return false
      }
      return true
    },
    validateMaxSize (file) {
      if (!file) {
        return false
      }
      if (file.size > this.maxSize) {
        this.showBubbleMessage('error', true, `Maximální povolená velikost souboru je: ${this.prettifySize(this.maxSize)}`)
        return false
      }
      return true
    },
    prettifySize (size) {
      let pretified
      if (size >= 1e3 && size < 1e6) {
        pretified = (size / 1e3) + ' kB'
      } else if (size >= 1e6) {
        pretified = (size / 1e6) + ' MB'
      } else {
        pretified = size.toString() + ' Bytů'
      }
      return pretified
    }
  }
}
</script>
