<template>
  <div :class="[bgColor, textColor, 'py-2 px-4 font-semibold text-sm rounded-lg inline-flex justify-between items-center']">
    <div class="inline-flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path v-if="type === 'info'" stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path v-if="type === 'success'" stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path v-if="type === 'warning'" stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        <path v-if="type === 'error'" stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ msg }}</span>
    </div>
    <button v-if="closeable != null && closeable == true" :class="[bgButtonColor, 'ml-2 bg-opacity-75 hover:bg-opacity-100 focus:outline-none p-1 rounded-full']" @click="close">
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
