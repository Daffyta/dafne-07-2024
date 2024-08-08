<template>
  <div>
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <div v-for="pokemon in pokemonList" :key="pokemon.id" class="pokemon-card">
        <img :src="pokemon.image" :alt="pokemon.name" class="w-full h-32 object-contain">
        <p class="text-center">{{ pokemon.name }}</p>
        <button @click="selectPokemon(pokemon)" class="bg-blue-500 text-white p-2 mt-2">Select</button>
      </div>
    </div>
    <button v-if="!loading" @click="loadMore" class="bg-green-500 text-white p-2 mt-4">Load More</button>
    <div v-if="loading" class="text-center">Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePokemon } from '../composables/usePokemon'

const { pokemonList, fetchPokemon, selectPokemon, loading } = usePokemon()

const loadMore = () => {
  fetchPokemon(pokemonList.value.length, 25)
}

onMounted(() => {
  if (pokemonList.value.length === 0) {
    fetchPokemon()
  }
})
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

