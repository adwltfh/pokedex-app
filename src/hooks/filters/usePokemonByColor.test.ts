import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement } from "react";
import { usePokemonByColor } from "./usePokemonByColor";

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
}

describe("usePokemonByColor", () => {
  it("fetches species names for a given color", async () => {
    const { result } = renderHook(() => usePokemonByColor("red"), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toContain("charmander");
    expect(result.current.data).toContain("flareon");
  });

  it("does not fire when colorName is empty", () => {
    const { result } = renderHook(() => usePokemonByColor(""), {
      wrapper: makeWrapper(),
    });

    expect(result.current.fetchStatus).toBe("idle");
    expect(result.current.data).toBeUndefined();
  });
});
