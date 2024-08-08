<template>
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
    <div v-for="pokemon in selectedPokemon" :key="pokemon.id" class="pokemon-card">
      <img :src="pokemon.image" :alt="pokemon.name" class="w-full h-32 object-contain">
      <p class="text-center">{{ pokemon.name }}</p>
      <button @click="removePokemon(pokemon)" class="bg-red-500 text-white p-2 mt-2">Remove</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePokemon } from '../composables/usePokemon'

const { selectedPokemon, removePokemon } = usePokemon()
</script>

<style scoped>
.pokemon-card {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  transition: transform 0.2s;
}
.pokemon-card:hover {
  transform: scale(1.05);
}
</style>

