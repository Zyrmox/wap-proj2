<template>
  <div>
      <div class="border-4 border-dashed border-green-500 rounded-xl p-4 sm:p-8">
          <div class="flex flex-col items-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-32 w-32 text-green-500 mb-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <div class="text-green-500 font-semibold text-2xl">Přetáhněte soubor</div>
            <div class="flex items-center w-1/4 my-3">
                <div class="flex-grow h-1 bg-gray-400"></div>
                <div class="flex-grow-0 text-gray-400 px-4 font-medium">nebo</div>
                <div class="flex-grow h-1 bg-gray-400"></div>

            </div>
            <div>
                <input type="file" class="text-white bg-green-500 px-4 py-2 font-semibold" placeholder="Procházet soubory">
            </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
}
</script>
