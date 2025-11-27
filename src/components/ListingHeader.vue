<script setup>
import { defineEmits, defineProps } from 'vue'
defineProps({
  total: { type: Number, required: true },
  active: { type: Number, default: null },
  bookmarks: { type: Number, default: 0 },
  view: { type: String, default: 'all' }
})
const emit = defineEmits(['update:view'])
</script>

<template>
  <div class="listings-header">
    <div>
      <h1>Dreams and Homes</h1>
      <p class="muted">Curated short-term rentals in Cape Town</p>
    </div>
    <div class="meta">
      {{ active !== null ? (active + ' of ' + total) : (total + ' properties') }}
      <span v-if="bookmarks">• {{ bookmarks }} favorites</span>
      <nav class="view-toggle" aria-label="Listings view">
        <button :class="{active: view === 'all'}" @click="emit('update:view', 'all')">All</button>
        <button :class="{active: view === 'favs'}" @click="emit('update:view', 'favs')">Favourites</button>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.listings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.listings-header h1 {
  margin: 0;
}
.listings-header .muted {
  color: var(--color-text);
  opacity: 0.8;
  font-size: 0.95rem;
}
.listings-header .meta {
  font-weight: 600;
}
.view-toggle { display:inline-flex; margin-left: 1rem }
.view-toggle button { background: transparent; border: 1px solid var(--color-border); padding: 0.25rem 0.6rem; border-radius: 6px; margin-left: 0.4rem; cursor: pointer }
.view-toggle button.active { background: var(--color-background-mute); border-color: var(--color-border-hover) }
</style>
