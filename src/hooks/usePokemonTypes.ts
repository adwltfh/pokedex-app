import { useQuery } from '@tanstack/react-query'
import { getPokemonTypes } from '../api/pokemon'

export const usePokemonTypes = () => {
  return useQuery({
    queryKey: ['pokemon-types'],
    queryFn: getPokemonTypes,
  })
}