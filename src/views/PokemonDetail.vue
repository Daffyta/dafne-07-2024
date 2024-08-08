<template>
  <div class="container mx-auto p-4" v-if="pokemon">
    <div class="flex flex-col items-center">
      <div class="grid grid-cols-2 gap-4 place-items-center">
        <div>
        <img :src="pokemon.image" :alt="pokemon.name" class="w-80 h-80 object-contain mb-4">
        <div class="text-center">
          <span v-for="type in pokemon.types" :key="type" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{{ type }}</span>
        </div>
      </div>
      <div>
        <h1 class="text-5xl font-bold mb-4 text-rose-700	">{{ pokemon.name }}</h1>
        <p class="mt-4 mb-2"><strong>Height:</strong> {{ pokemon.height / 10 }} m</p>
        <p class="mb-2"> <strong>Weight:</strong> {{ pokemon.weight / 10 }} kg</p>
        <p class="mb-6"><strong>Description:</strong> {{ pokemon.description }}</p>
        <audio :src="pokemon.sound" controls></audio>
      </div>
      </div>
      <canvas ref="chart"></canvas>
      <div class="evolution-chain mt-32">
        <h2 class="text-4xl font-bold mb-2 text-center">Evolution Chain</h2>
        <div class="flex space-between evolution-cards">
          <div v-for="evo in pokemon.evolutionChain" :key="evo.name" class="text-center mx-2 card">
            <img :src="evo.image" :alt="evo.name" class="w-200 h-200 object-contain object-contain-card">
            <p class="text-xl">{{ evo.name }}</p>
          </div>
        </div>
      </div>
      <button @click="goBack" class="bg-blue-500 text-white p-2 mt-4 btn-back">Back to Team</button>
    </div>
  </div>
  <div v-else class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Loading...</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePokemonStore } from '../stores/pokemonStore'
import Chart from 'chart.js/auto'

const route = useRoute()
const router = useRouter()
const store = usePokemonStore()
const pokemon = ref<any>(null)

onMounted(async () => {
  const pokemonId = route.params.id
  const selectedPokemon = store.selectedPokemon.find(p => p.id == pokemonId)
  if (selectedPokemon) {
    await store.fetchPokemonDetails(selectedPokemon)
    pokemon.value = selectedPokemon

    await nextTick()

    const ctx = (document.querySelector('canvas') as HTMLCanvasElement).getContext('2d')
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: pokemon.value.stats?.map(stat => stat.name),
          datasets: [{
            label: 'Stats',
            data: pokemon.value.stats?.map(stat => stat.value),
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
  } else {
    router.push('/team')
  }
})

const goBack = () => {
  router.push('/team')
}
</script>

<style scoped>
.evolution-chain {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.evolution-cards {
  position: relative;
  display: flex;
  align-items: center;
}

.evolution-cards .card {
  position: relative;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  transition: transform 0.2s;
  margin: 20px;
}

.evolution-cards .card:not(:last-child)::after {
  content: '';
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translateY(-50%) scaleX(-1);
  transform: rotate(-0.25turn);
  width: 40px;
  height: 40px;
  background: url('/flecha.svg') no-repeat center center;
  background-size: contain;
}

.object-contain-card{
  width: 250px;
}

.btn-back{
  margin-top: 5%;
  width: 20%;
  border-radius: 5px;
}
</style>