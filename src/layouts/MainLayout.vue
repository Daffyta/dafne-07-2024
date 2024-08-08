<template>
  <div>
    <nav class="bg-red-700 p-4 text-white flex justify-between items-center">
      <div class="flex items-center">
        <router-link to="/" class="hover:underline font-bold text-xl">
          <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="Logo" class="mr-4">
        </router-link>
      </div>
      <div class="space-x-8 pr-4">
        <router-link to="/" class="hover:underline font-bold text-xl">List</router-link>
        <router-link to="/team" class="hover:underline font-bold text-xl">Team</router-link>
      </div>
    </nav>
    <main class="p-4">
      <router-view />
    </main>
  </div>
</template>

