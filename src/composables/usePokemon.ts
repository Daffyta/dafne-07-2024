import { ref } from 'vue'
import axios from 'axios'

interface Pokemon {
  name: string
  url: string
  image: string
  id: number
}

interface State {
  pokemonList: Pokemon[]
  selectedPokemon: Pokemon[]
}

export function usePokemon() {
  const pokemonList = ref<Pokemon[]>([])
  const selectedPokemon = ref<Pokemon[]>([])

  const fetchPokemon = async (offset: number = 0, limit: number = 151) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    const results = response.data.results.map((pokemon: any, index: number) => {
      const id = offset + index + 1
      return {
        ...pokemon,
        id,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      }
    })
    pokemonList.value = results
  }

  const selectPokemon = (pokemon: Pokemon) => {
    if (selectedPokemon.value.length < 6 && !selectedPokemon.value.includes(pokemon)) {
      selectedPokemon.value.push(pokemon)
    }
  }

  const removePokemon = (pokemon: Pokemon) => {
    selectedPokemon.value = selectedPokemon.value.filter(p => p.id !== pokemon.id)
  }

  return {
    pokemonList,
    selectedPokemon,
    fetchPokemon,
    selectPokemon,
    removePokemon
  }
}


