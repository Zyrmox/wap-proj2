<template>
  <div :class="[bgColor, textColor, 'py-2 px-4 font-semibold text-sm rounded-lg flex justify-between items-center']">
    <div>{{ msg }}</div>
    <button v-if="closeable != null && closeable == true" :class="[bgButtonColor, 'bg-opacity-75 hover:bg-opacity-100 focus:outline-none p-1 rounded-full']" @click="close">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      required: true,
      type: [Number, String]
    },
    type: {
      required: true,
      type: String,
      validator: val => ['info', 'success', 'warning', 'error'].includes(val)
    },
    msg: {
      required: true,
      type: String
    },
    closeable: {
      required: false,
      type: Boolean
    }
  },
  data () {
    return {
      opened: true,
      colors: {
        info: 'blue',
        success: 'green',
        warning: 'yellow',
        error: 'red'
      }
    }
  },
  computed: {
    bgColor () {
      return 'bg-' + this.colors[this.type] + '-300'
    },
    bgButtonColor () {
      return 'bg-' + this.colors[this.type] + '-400'
    },
    textColor () {
      return 'text-' + this.colors[this.type] + '-600'
    }
  },
  methods: {
    close () {
      this.$store.commit('messages/hide', this.id)
    }
  }
}
</script>
