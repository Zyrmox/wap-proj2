<template>
  <div class="grid grid-cols-1 items-center justify-center">
    <box>
      <h1 class="text-xl font-semibold pb-6">
        Nahrajte soubor
      </h1>
      <file-upload-area />
      <message-bubble
        v-for="mes in messages"
        :id="mes.id"
        :key="mes.id"
        :type="mes.type"
        :closeable="mes.closeable"
        :msg="mes.msg"
        class="mt-4"
      />
    </box>
  </div>
</template>

<script>
export default {
  computed: {
    messages () {
      return this.$store.state.messages.list
    }
  }
}
</script>

<style>
</style>
