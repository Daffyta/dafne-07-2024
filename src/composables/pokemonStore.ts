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
}

interface State {
  pokemonList: Pokemon[]
  selectedPokemon: Pokemon[]
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
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        }
      })
      this.pokemonList = results
    },
    async fetchPokemonDetails(pokemon: Pokemon) {
      const response = await axios.get(pokemon.url)
      const data = response.data

      pokemon.types = data.types.map((type: any) => type.type.name)
      pokemon.stats = data.stats.map((stat: any) => ({
        name: stat.stat.name,
        value: stat.base_stat
      }))
      pokemon.sound = `https://pokemoncries.com/cries/${pokemon.id}.mp3`
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
