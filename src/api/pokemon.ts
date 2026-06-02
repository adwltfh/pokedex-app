import axios from 'axios'
import type { PokemonListResponse, PokemonDetail } from '../types/pokemon'

const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
})

export const getPokemonList = async (offset: number, limit = 20): Promise<PokemonListResponse> => {
  const { data } = await apiClient.get('/pokemon', {
    params: { offset, limit }
  })
  return data
}

export const getPokemonDetail = async (name: string): Promise<PokemonDetail> => {
  const { data } = await apiClient.get(`/pokemon/${name}`)
  return data
}

export const getPokemonTypes = async () => {
  const { data } = await apiClient.get('/type')
  return data
}
