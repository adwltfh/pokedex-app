import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement } from "react";
import { usePokemonByHabitat } from "./usePokemonByHabitat";

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
}

describe("usePokemonByHabitat", () => {
  it("fetches species names for a given habitat", async () => {
    const { result } = renderHook(() => usePokemonByHabitat("forest"), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toContain("bulbasaur");
    expect(result.current.data).toContain("caterpie");
  });

  it("does not fire when habitatName is empty", () => {
    const { result } = renderHook(() => usePokemonByHabitat(""), {
      wrapper: makeWrapper(),
    });

    expect(result.current.fetchStatus).toBe("idle");
    expect(result.current.data).toBeUndefined();
  });
});
