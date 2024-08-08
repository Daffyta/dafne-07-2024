<template>
  <nav class="bg-red-700 w-full text-white flex justify-between items-center p-4 shadow-md">
    <router-link to="/" class="hover:underline font-bold text-xl">
        <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="Logo" class="mr-4">
      </router-link>
    <ul class="flex space-x-4">
      <li>
        <router-link to="/" class="hover:underline font-bold text-xl text-white ">List</router-link>
      </li>
      <li>
        <router-link to="/team" class="hover:underline font-bold text-xl text-white ">Team</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
nav ul li a {
  display: block;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}
nav ul li a:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
