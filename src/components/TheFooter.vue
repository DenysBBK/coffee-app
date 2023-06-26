<template>
    <footer class="bg-green-600 flex flex-col items-center justify-center">
  <div class="flex container items-center justify-center pt-3">
    <router-link to="/terms">
      <button class="py-2 px-4 bg-blue-500 text-white rounded-md mr-2">Terms</button>
    </router-link>
    <router-link to="/privacy-policy">
      <button class="py-2 px-4 bg-blue-500 text-white rounded-md mr-2">Privacy Policy</button>
    </router-link>
  </div>
  <div class="h-px w-full bg-gray-300 my-3"></div>
  <span class="text-white pb-3">2023 Take and go. All rights reserved</span>
</footer>
</template>