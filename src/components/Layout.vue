<template>
  <div>
    <header class="bg-red-700 text-white w-full shadow-md">
      <Navbar />
    </header>
    <main class="container mx-auto px-4 py-8">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from './Navbar.vue'
</script>

