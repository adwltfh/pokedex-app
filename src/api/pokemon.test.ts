import { describe, it, expect } from "vitest";
import { getPokemonByColor, getPokemonByHabitat } from "./pokemon";

describe("getPokemonByColor", () => {
  it("returns an array of species names for a valid color", async () => {
    const result = await getPokemonByColor("red");
    expect(Array.isArray(result)).toBe(true);
    expect(result).toContain("charmander");
    expect(result).toContain("flareon");
  });

  it("returns an empty array when color has no species", async () => {
    const result = await getPokemonByColor("pink");
    expect(result).toEqual([]);
  });
});

describe("getPokemonByHabitat", () => {
  it("returns an array of species names for a valid habitat", async () => {
    const result = await getPokemonByHabitat("forest");
    expect(Array.isArray(result)).toBe(true);
    expect(result).toContain("bulbasaur");
    expect(result).toContain("caterpie");
  });

  it("returns an empty array when habitat has no species", async () => {
    const result = await getPokemonByHabitat("cave");
    expect(result).toEqual([]);
  });
});
