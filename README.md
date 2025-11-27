# Vite + Vue

## Homes & Beyond - Mini Property Listings

This is a lightweight Vue 3 single-page application prototype that displays short-term property listings for Homes & Beyond.

Features:
- Dynamic property cards from a local data array
- Search bar to filter by title or location
- Sort toggle for price (low-to-high, high-to-low)
- Badge and ribbon for 'Not Available' items
- Bookmark favourites persisted in localStorage
- Toggle to only show favourites (bookmarks-only)
- Price range filter (min/max) for quick narrowing
- Smooth animations for card transitions on filtering/sorting
 - View toggle 'All' / 'Favourites' in the header
 - Dual-handle range slider (fall back to two-range inputs) with numeric precision fields
 - Unit tests (Vitest) for filter & sort logic

To run locally:
```powershell
npm install
npm run dev
```

Open http://localhost:5173 in your browser.


---

## Project Overview

This SPA is a prototype listing tool for Homes & Beyond. It demonstrates:
- Dynamically-rendered property cards from a local array in `src/data/properties.js`.
- Search by title and location using a reactive search input bound by `v-model`.
- Sorting by price using a `select` with `v-model:sort`.
- Bookmark favourites, persisted to `localStorage`. This persists across reloads.
- A responsive grid layout (1-3 columns depending on screen size).

Open the app locally and experiment with the search and sorting to see the data bound UI.

To run unit tests (Vitest):
```powershell
npm run test
```

Screenshot (placeholder):
![Listings screenshot](./screenshot.png)

# property-mini-listings

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
