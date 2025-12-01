<script setup>
import { defineEmits, defineProps, computed } from 'vue'
const props = defineProps({
  modelValue: { type: String, default: '' },
  sort: { type: String, default: 'low' },
  minPrice: { type: Number, default: 0 },
    maxPrice: { type: Number, default: 10000 },
    rangeMax: { type: Number, default: 10000 },
  favsOnly: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue', 'update:sort', 'update:minPrice', 'update:maxPrice', 'update:favsOnly', 'clear'])

const localSearch = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})
const localSort = computed({
  get: () => props.sort,
  set: (v) => emit('update:sort', v)
})
const localMin = computed({
  get: () => props.minPrice,
  set: (v) => emit('update:minPrice', Number(v))
})
const localMax = computed({
  get: () => props.maxPrice,
  set: (v) => emit('update:maxPrice', Number(v))
})
const localFavsOnly = computed({
  get: () => props.favsOnly,
  set: (v) => emit('update:favsOnly', Boolean(v))
})
</script>

<template>
  <div class="search-sort">
    <input
      type="search"
      placeholder="Search by title or location..."
      v-model="localSearch"
    />

    <div class="sort">
      <label for="sort">Sort</label>
      <select id="sort" v-model="localSort">
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>
    </div>

    <div class="price-filter">
      <label>Price</label>
      <div class="inputs">
        <input type="number" v-model.number="localMin" min="0" placeholder="min" />
        <span class="dash">—</span>
        <input type="number" v-model.number="localMax" :min="localMin || 0" placeholder="max" />
      </div>
      <div class="slider">
        <input type="range" v-model.number="localMin" :min="0" :max="props.rangeMax" step="10" />
        <input type="range" v-model.number="localMax" :min="0" :max="props.rangeMax" step="10" />
        <div class="range-values">R{{ localMin }} — R{{ localMax }}</div>
      </div>
    </div>

    <div class="favs">
      <label>
        <input type="checkbox" v-model="localFavsOnly" /> Favourites only
      </label>
    </div>

    <div class="clear">
      <button @click="$emit('clear')">Clear Filters</button>
    </div>
  </div>
</template>

<style scoped>
.search-sort {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0 1.5rem 0;
}
.search-sort input[type="search"] {
  flex: 1;
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
}
.search-sort .sort {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.price-filter { display:flex; align-items:center; gap:0.6rem }
.price-filter .inputs { display:flex; gap:0.4rem; align-items:center }
.price-filter input { width:80px; padding:0.4rem; border:1px solid var(--color-border); border-radius:5px }
.dash { opacity:0.6 }
.favs { display:flex; align-items:center; gap:0.4rem }
.slider { display:flex; gap:0.5rem; width:100%; align-items:center }
.slider input[type='range'] { width:100%; -webkit-appearance:none; appearance:none; height:6px; background: linear-gradient(to right, #cfd8ff, #f8e6ff); border-radius:4px; }
.slider input[type='range']::-webkit-slider-thumb { -webkit-appearance:none; width:14px; height:14px; border-radius:50%; background:#2c7a7b; box-shadow:0 2px 6px rgba(0,0,0,0.15) }
.range-values { min-width:110px; text-align:right; font-weight:600 }
.search-sort select { padding: 0.5rem; }
.clear button { padding: 0.5rem 0.75rem; border-radius: 6px; border: 1px solid var(--color-border); background: transparent; cursor: pointer }
.clear button:hover { background: var(--color-background-mute) }
</style>
