<template>
  <div class="container mx-auto p-4">
    <h1 class="text-7xl font-bold mb-8 flex justify-center">Pokémon List</h1>
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
      <div v-for="pokemon in paginatedPokemon" :key="pokemon.id" class="pokemon-card">
        <img :src="pokemon.image" :alt="pokemon.name" class="w-full h-56 object-contain">
        <p class="text-center">{{ pokemon.name }}</p>
        <button @click="selectPokemon(pokemon)" :disabled="selectedPokemon.includes(pokemon) || selectedPokemon.length >= 6" class="bg-blue-500 text-white p-2 mt-2 btn-select">
          {{ selectedPokemon.includes(pokemon) ? 'Selected' : 'Select' }}
        </button>
      </div>
    </div>
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      :totalItems="totalItems"
      :pageSize="pageSize"
      @update:currentPage="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePokemonStore } from '../stores/pokemonStore'
import Pagination from '../components/Pagination.vue'

const store = usePokemonStore()

const currentPage = ref(1)
const pageSize = 25

const paginatedPokemon = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return store.pokemonList.slice(start, end)
})

const totalItems = computed(() => store.pokemonList.length)
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize))

const handlePageChange = (page: number) => {
  currentPage.value = page
}

onMounted(() => {
  if (store.pokemonList.length === 0) {
    store.fetchPokemon()
  }
})

const selectPokemon = (pokemon: any) => {
  store.selectPokemon(pokemon)
}

const selectedPokemon = computed(() => store.selectedPokemon)
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

.btn-select {
  width: 100%;
  border-radius: 5px;
}
</style>
