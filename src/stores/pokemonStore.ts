import { defineStore } from 'pinia'
import axios from 'axios'

export interface Pokemon {
  name: string
  url: string
  image: string
  id: number
  types?: string[]
  stats?: { name: string, value: number }[]
  sound?: string
  height?: number
  weight?: number
  description?: string
  evolutionChain?: { name: string, image: string }[]
}

interface State {
  pokemonList: Pokemon[]
  selectedPokemon: Pokemon[]
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const usePokemonStore = defineStore('pokemon', {
  state: (): State => ({
    pokemonList: [],
    selectedPokemon: []
  }),
  actions: {
    async fetchPokemon(offset: number = 0, limit: number = 151) {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      const results = response.data.results.map((pokemon: any, index: number) => {
        const id = offset + index + 1
        return {
          ...pokemon,
          id,
          name: capitalize(pokemon.name), // Capitalizar el nombre del Pokémon
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        }
      })
      this.pokemonList = results
    },
    async fetchPokemonDetails(pokemon: Pokemon) {
      const response = await axios.get(pokemon.url)
      const data = response.data

      pokemon.types = data.types.map((type: any) => capitalize(type.type.name))
      pokemon.stats = data.stats.map((stat: any) => ({
        name: capitalize(stat.stat.name),
        value: stat.base_stat
      }))
      pokemon.sound = `https://pokemoncries.com/cries/${pokemon.id}.mp3`
      pokemon.height = data.height
      pokemon.weight = data.weight

      // Obtener la descripción
      const speciesResponse = await axios.get(data.species.url)
      const speciesData = speciesResponse.data
      pokemon.description = speciesData.flavor_text_entries.find((entry: any) => entry.language.name === 'en').flavor_text

      // Obtener la cadena evolutiva
      const evolutionChainResponse = await axios.get(speciesData.evolution_chain.url)
      const evolutionChainData = evolutionChainResponse.data
      pokemon.evolutionChain = this.getEvolutionChain(evolutionChainData.chain)
    },
    getEvolutionChain(chain: any) {
      const evolutionChain = []
      let current = chain

      while (current) {
        const id = parseInt(current.species.url.split('/').slice(-2, -1)[0])
        evolutionChain.push({
          name: capitalize(current.species.name),
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        })
        current = current.evolves_to[0]
      }

      return evolutionChain
    },
    selectPokemon(pokemon: Pokemon) {
      if (this.selectedPokemon.length < 6 && !this.selectedPokemon.find(p => p.id === pokemon.id)) {
        this.selectedPokemon.push(pokemon)
      }
    },
    removePokemon(pokemon: Pokemon) {
      this.selectedPokemon = this.selectedPokemon.filter(p => p.id !== pokemon.id)
    }
  }
})
