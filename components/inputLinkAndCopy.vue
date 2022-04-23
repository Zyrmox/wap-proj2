<template>
  <div>
    <label class="block mb-2 text-sm font-medium">{{ label }}</label>
    <div class="input-group flex flex-nowrap items-stretch w-full">
      <input
        ref="clone"
        :value="url"
        type="text"
        class="form-control flex-auto text-white bg-green-500 block w-full px-3 bg-clip-padding rounded"
        readonly
        @focus="$event.target.select()"
      >
      <button
        id=""
        class="inline-block px-6 bg-gray-800 text-white leading-tight rounded hover:bg-gray-900 flex"
        type="button"
        @click.prevent="copyToClipboard"
      >
        copy
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['label', 'url'],
  methods: {
    copyToClipboard () {
      this.$refs.clone.focus()
      document.execCommand('copy')
    }
  }
}
</script>

<style>

</style>
