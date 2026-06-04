import { http, HttpResponse } from "msw";

const BASE = "https://pokeapi.co/api/v2";

export const handlers = [
  http.get(`${BASE}/pokemon-color/:name`, ({ params }) => {
    const name = params.name as string;
    const speciesByColor: Record<string, string[]> = {
      red:    ["charmander", "charmeleon", "charmanite", "flareon"],
      blue:   ["squirtle", "wartortle", "blastoise"],
      green:  ["bulbasaur", "ivysaur", "venusaur"],
      yellow: ["pikachu", "raichu"],
    };
    const species = (speciesByColor[name] ?? []).map((n) => ({
      name: n,
      url: `${BASE}/pokemon-species/${n}/`,
    }));
    return HttpResponse.json({ id: 1, name, pokemon_species: species });
  }),

  http.get(`${BASE}/pokemon-habitat/:name`, ({ params }) => {
    const name = params.name as string;
    const speciesByHabitat: Record<string, string[]> = {
      forest:    ["bulbasaur", "ivysaur", "venusaur", "caterpie"],
      grassland: ["charmander", "oddish", "bellsprout"],
      sea:       ["squirtle", "wartortle", "tentacool"],
    };
    const species = (speciesByHabitat[name] ?? []).map((n) => ({
      name: n,
      url: `${BASE}/pokemon-species/${n}/`,
    }));
    return HttpResponse.json({ id: 1, name, pokemon_species: species });
  }),

  http.get(`${BASE}/type/:name`, ({ params }) => {
    const name = params.name as string;
    const pokemonByType: Record<string, string[]> = {
      fire:  ["charmander", "charmeleon", "flareon", "moltres"],
      water: ["squirtle", "wartortle", "blastoise", "tentacool"],
      grass: ["bulbasaur", "ivysaur", "venusaur", "oddish"],
    };
    const pokemon = (pokemonByType[name] ?? []).map((n) => ({
      pokemon: { name: n, url: `${BASE}/pokemon/${n}/` },
    }));
    return HttpResponse.json({ id: 1, name, pokemon });
  }),

  http.get(`${BASE}/pokemon`, () => {
    return HttpResponse.json({
      count: 4,
      next: null,
      previous: null,
      results: [
        { name: "bulbasaur",  url: `${BASE}/pokemon/1/` },
        { name: "charmander", url: `${BASE}/pokemon/4/` },
        { name: "squirtle",   url: `${BASE}/pokemon/7/` },
        { name: "pikachu",    url: `${BASE}/pokemon/25/` },
      ],
    });
  }),
];
