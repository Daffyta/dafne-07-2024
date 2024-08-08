<template>
  <div class="container mx-auto p-4">
    <h1 class="text-7xl font-bold mb-4 flex justify-center">My Pokémon Team</h1>
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-4">
      <div v-for="pokemon in selectedPokemon" :key="pokemon.id" class="pokemon-card">
        <img :src="pokemon.image" :alt="pokemon.name" class="w-full h-32 object-contain">
        <p class="text-center">{{ pokemon.name }}</p>
        <div class="text-center">
          <span v-for="type in pokemon.types" :key="type" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{{ type }}</span>
        </div>
        <canvas :id="'chart-' + pokemon.id"></canvas>
        <audio class="audio-center" :src="pokemon.sound" controls></audio>
        <router-link :to="`/team/${pokemon.id}`" class="bg-green-500 text-white p-2 mt-2 block text-center btn-detail">View Details</router-link>
        <button @click="removePokemon(pokemon)" class="bg-red-500 text-white p-2 mt-2 btn-remove">Remove</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, nextTick } from 'vue'
import { usePokemonStore } from '../stores/pokemonStore'
import Chart from 'chart.js/auto'

const store = usePokemonStore()
const selectedPokemon = computed(() => store.selectedPokemon)

const removePokemon = (pokemon: any) => {
  store.removePokemon(pokemon)
}

onMounted(() => {
  nextTick(() => {
    selectedPokemon.value.forEach(pokemon => {
      store.fetchPokemonDetails(pokemon).then(() => {
        const ctx = document.getElementById(`chart-${pokemon.id}`) as HTMLCanvasElement | null
        if (ctx) {
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: pokemon.stats?.map(stat => stat.name),
              datasets: [{
                label: 'Stats',
                data: pokemon.stats?.map(stat => stat.value),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          })
        }
      })
    })
  })
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

.btn-remove, .btn-detail {
  width: 100%;
  border-radius: 5px;
}

.audio-center{
  width: 100%;
}
</style>
