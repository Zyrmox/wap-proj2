<template>
  <box>
    <div class="flex flex-col items-center text-green-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-32 w-32"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M 9 15 L 15 9 M 9 9 l 6 6" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
      <label class="text-green-500 font-semibold text-2xl">File not found</label>
    </div>
  </box>
</template>

<script>
import Box from '~/components/Box.vue'
export default {
  components: { Box }

}
</script>
<style>

</style>
