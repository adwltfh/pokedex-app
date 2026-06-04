import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "../../test/server";
import { renderWithQuery } from "../../test/utils";
import FilteredResults from "./FilteredResults";

// Render cards as simple text nodes so we can assert names without detail API calls
vi.mock("../pokemon/PokemonCard", () => ({
  default: ({ name }: { name: string }) => <div data-testid="card">{name}</div>,
}));

const BASE = "https://pokeapi.co/api/v2";

const noop = vi.fn();

beforeEach(() => {
  noop.mockClear();
});

describe("FilteredResults", () => {
  it("shows loading skeleton initially", () => {
    renderWithQuery(
      <FilteredResults type="fire" color="" habitat="" letter="" search="" onSelect={noop} />,
    );
    // CardSkeleton renders pulse divs, not named role — just check no cards yet
    expect(screen.queryAllByTestId("card")).toHaveLength(0);
  });

  it("renders cards for a type filter", async () => {
    renderWithQuery(
      <FilteredResults type="fire" color="" habitat="" letter="" search="" onSelect={noop} />,
    );
    await waitFor(() => expect(screen.getAllByTestId("card").length).toBeGreaterThan(0));
    const names = screen.getAllByTestId("card").map((el) => el.textContent);
    expect(names).toContain("charmander");
    expect(names).toContain("flareon");
    expect(names).not.toContain("squirtle"); // water type
  });

  it("renders cards for a color filter", async () => {
    renderWithQuery(
      <FilteredResults type="" color="blue" habitat="" letter="" search="" onSelect={noop} />,
    );
    await waitFor(() => expect(screen.getAllByTestId("card").length).toBeGreaterThan(0));
    const names = screen.getAllByTestId("card").map((el) => el.textContent);
    expect(names).toContain("squirtle");
    expect(names).not.toContain("charmander");
  });

  it("intersects type and color filters", async () => {
    // fire type: [charmander, charmeleon, flareon, moltres]
    // red color: [charmander, charmeleon, charmanite, flareon]
    // intersection: [charmander, charmeleon, flareon]
    renderWithQuery(
      <FilteredResults type="fire" color="red" habitat="" letter="" search="" onSelect={noop} />,
    );
    await waitFor(() => expect(screen.getAllByTestId("card").length).toBeGreaterThan(0));
    const names = screen.getAllByTestId("card").map((el) => el.textContent);
    expect(names).toContain("charmander");
    expect(names).toContain("flareon");
    expect(names).not.toContain("moltres"); // fire but not red
    expect(names).not.toContain("squirtle"); // neither
  });

  it("filters by search query substring", async () => {
    renderWithQuery(
      <FilteredResults type="fire" color="" habitat="" letter="" search="charm" onSelect={noop} />,
    );
    await waitFor(() => expect(screen.getAllByTestId("card").length).toBeGreaterThan(0));
    const names = screen.getAllByTestId("card").map((el) => el.textContent);
    expect(names.every((n) => n?.includes("charm"))).toBe(true);
    expect(names).not.toContain("flareon");
  });

  it("filters by letter", async () => {
    renderWithQuery(
      <FilteredResults type="fire" color="" habitat="" letter="F" search="" onSelect={noop} />,
    );
    await waitFor(() => expect(screen.getAllByTestId("card").length).toBeGreaterThan(0));
    const names = screen.getAllByTestId("card").map((el) => el.textContent);
    expect(names).toContain("flareon");
    expect(names).not.toContain("charmander");
  });

  it("shows empty state when no results match", async () => {
    // Override handlers to return empty lists
    server.use(
      http.get(`${BASE}/type/fire`, () =>
        HttpResponse.json({ pokemon: [] }),
      ),
    );
    renderWithQuery(
      <FilteredResults type="fire" color="" habitat="" letter="" search="" onSelect={noop} />,
    );
    await waitFor(() =>
      expect(screen.getByText("No Pokémon found")).toBeInTheDocument(),
    );
  });

  it("shows no-search-results state when search has no matches", async () => {
    renderWithQuery(
      <FilteredResults type="fire" color="" habitat="" letter="" search="zzzzz" onSelect={noop} />,
    );
    await waitFor(() =>
      expect(screen.getByText(/No results for "zzzzz"/)).toBeInTheDocument(),
    );
  });

  it("calls onClearAll when clear-all button is clicked in empty state", async () => {
    const onClearAll = vi.fn();
    server.use(
      http.get(`${BASE}/type/fire`, () =>
        HttpResponse.json({ pokemon: [] }),
      ),
    );
    renderWithQuery(
      <FilteredResults
        type="fire" color="" habitat="" letter="" search=""
        onSelect={noop}
        onClearAll={onClearAll}
      />,
    );
    await waitFor(() =>
      expect(screen.getByText("Clear all filters")).toBeInTheDocument(),
    );
    await userEvent.click(screen.getByText("Clear all filters"));
    expect(onClearAll).toHaveBeenCalledOnce();
  });
});
