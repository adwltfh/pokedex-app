# [Pokédex](http://217.216.73.206:307)

A fast, fully-featured Pokédex web app built with React 19 and TypeScript. Browse all 1,000+ Pokémon, filter by multiple criteria simultaneously, and dive into detailed stats — all powered by the free [PokéAPI](https://pokeapi.co/).

---

## Features

- **Infinite scroll** — browse all Pokémon with automatic pagination
- **Real-time search** — filter by name as you type (substring match)
- **Multi-filter system** — combine type, color, and habitat filters; results are intersected automatically
  - 18 **types** (color-coded badges)
  - 10 **species colors** (with visual swatches)
  - 9 **habitats** (cave, forest, sea, urban, and more)
- **A–Z letter filter** — jump to any starting letter
- **Active filter chips** — see all active filters at a glance; dismiss individually or clear all
- **Detail page** with tabbed sections:
  - Overview: abilities, physical stats, capture rate, type weaknesses, evolution chain
  - Stats: animated base stat bars
  - Moves: paginated move list
- **Fully responsive** — bottom-drawer filter panel on mobile/tablet, sidebar layout on desktop
- **Empty state** — contextual messages with clear-all shortcut when no results match

---

## Tech Stack

| Tool | Version | Role |
|------|---------|------|
| [React](https://react.dev) | 19 | UI framework |
| [TypeScript](https://www.typescriptlang.org) | 6 | Static typing |
| [Vite](https://vite.dev) | 8 | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Utility-first styling |
| [TanStack React Query](https://tanstack.com/query) | 5 | Server state caching & async data fetching |
| [React Router](https://reactrouter.com) | 7 | Client-side routing |
| [Axios](https://axios-http.com) | 1.x | HTTP client |
| [Vitest](https://vitest.dev) | 4 | Unit & component test runner |
| [React Testing Library](https://testing-library.com/react) | 16 | Behavior-driven component tests |
| [MSW](https://mswjs.io) | 2 | Network-level API mocking in tests |

---

## Architecture

### Folder structure

```
src/
├── api/                  PokeAPI client functions
├── components/
│   ├── filters/          Filter UI (FilterBar, ColorFilter, HabitatFilter,
│   │                     AbjadFilter, FilterDrawer, ActiveFilterChips, FilteredResults)
│   ├── pokemon/          PokemonCard, PokemonList, EvolutionChain
│   └── ui/               Navbar, CardSkeleton, SearchBar
├── hooks/
│   ├── filters/          usePokemonByTypes/Color/Habitat
│   └── pokemon/          usePokemonDetail/List/Species/Types/etc.
├── pages/                ListPage, DetailPage
├── test/                 MSW server, handlers, setup, renderWithQuery util
├── types/                pokemon.ts, filters.ts
└── utils/                parseEvolutionChain, typeColors
```

### Key patterns

**React Query for all data fetching** — each API endpoint has a typed custom hook. Results are cached and shared across components, preventing duplicate network requests.

**Filter intersection via Set** — when multiple API filters are active (type + color + habitat), `FilteredResults` fetches each list independently through React Query and intersects the name sets client-side. Letter and search filters are then applied as a final pass.

**MSW v2 for tests** — Mock Service Worker intercepts Axios requests at the network level. Hooks and React Query logic run exactly as in production — no module mocking required.

**Centralized types** — component prop interfaces live in `src/types/filters.ts` and are imported directly, keeping components free of local interface boilerplate.

---

## Getting Started

To locally run the project, follow these command.

```bash
git clone https://github.com/your-username/pokedex.git
cd pokedex
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with HMR |
| `pnpm build` | Type-check and build for production |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run tests in watch mode |
| `pnpm test:run` | Run all tests once |
| `pnpm test:coverage` | Generate coverage report |

---

## Testing

**23 tests across 5 files**, using Vitest + React Testing Library + MSW.

| File | What's covered |
|------|---------------|
| `src/api/pokemon.test.ts` | `getPokemonByColor`, `getPokemonByHabitat` — correct URL, correct return shape |
| `src/hooks/filters/usePokemonByColor.test.ts` | Fetches names; query disabled when color is empty |
| `src/hooks/filters/usePokemonByHabitat.test.ts` | Same pattern for habitat |
| `src/components/ui/SearchBar.test.tsx` | Render, type, clear button appearance and behavior |
| `src/components/filters/FilteredResults.test.tsx` | Type-only, color-only, type+color intersection, search substring, letter filter, empty state, clear-all callback |

---

## Data Source

All Pokémon data is fetched from [PokéAPI](https://pokeapi.co/) — a free, open REST API. No API key required.
