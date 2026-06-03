import axios from "axios";
import type {
  PokemonListResponse,
  PokemonDetail,
  PokemonListItem,
  PokemonSpecies,
  EvolutionChain,
} from "../types/pokemon";

const apiClient = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export const getPokemonList = async (
  offset: number,
  limit = 20,
): Promise<PokemonListResponse> => {
  const { data } = await apiClient.get("/pokemon", {
    params: { offset, limit },
  });
  return data;
};

export const getPokemonDetail = async (
  name: string,
): Promise<PokemonDetail> => {
  const { data } = await apiClient.get(`/pokemon/${name}`);
  return data;
};

export const getPokemonTypes = async () => {
  const { data } = await apiClient.get("/type");
  return data;
};

export const getPokemonByType = async (
  typeName: string,
): Promise<PokemonListItem[]> => {
  const { data } = await apiClient.get(`/type/${typeName}`);
  return data.pokemon.map((p: { pokemon: PokemonListItem }) => p.pokemon);
};

export const getPokemonSpecies = async (
  name: string,
): Promise<PokemonSpecies> => {
  const { data } = await apiClient.get(`/pokemon-species/${name}`);
  return data;
};

export const getEvolutionChain = async (
  url: string,
): Promise<EvolutionChain> => {
  const { data } = await axios.get(url);
  return data;
};

export const getAllPokemon = async (): Promise<PokemonListItem[]> => {
  const { data } = await apiClient.get("/pokemon", {
    params: { limit: 10000, offset: 0 },
  });
  return data.results;
};
