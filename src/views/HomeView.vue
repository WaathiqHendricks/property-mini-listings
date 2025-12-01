<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import ListingHeader from '../components/ListingHeader.vue'
import SearchSortBar from '../components/SearchSortBar.vue'
import PropertyCard from '../components/PropertyCard.vue'
import properties from '../data/properties.js'
import filterAndSort from '../utils/filterProperties.js'

const search = ref('')
const sort = ref('low')
const bookmarks = ref([])
const minPrice = ref(0)
const maxPrice = ref(1000)
const rangeMax = ref(1000)
const favsOnly = ref(false)
const view = ref('all')

onMounted(() => {
  const saved = localStorage.getItem('bookmarks')
  if (saved) bookmarks.value = JSON.parse(saved)
  const prices = properties.map(p => typeof p.price === 'number' ? p.price : Number(p.price) || 0)
  rangeMax.value = Math.max(...prices)
  minPrice.value = 0
  maxPrice.value = rangeMax.value
  favsOnly.value = false
  view.value = 'all'
})

function toggleBookmark(id) {
  const idx = bookmarks.value.indexOf(id)
  if (idx === -1) bookmarks.value.push(id)
  else bookmarks.value.splice(idx, 1)
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks.value))
}

function clearFilters() {
  search.value = ''
  sort.value = 'low'
  minPrice.value = 0
  maxPrice.value = rangeMax.value
  favsOnly.value = false
  view.value = 'all'
}

watch(view, (v) => { favsOnly.value = (v === 'favs') })
watch(favsOnly, (val) => { view.value = val ? 'favs' : 'all' })

watch(minPrice, (v) => {
  const n = Number(v) || 0
  if (n > Number(maxPrice.value)) maxPrice.value = n
})
watch(maxPrice, (v) => {
  const n = Number(v)
  if (!isFinite(n)) return
  if (n < Number(minPrice.value)) minPrice.value = n
})

const filtered = computed(() => filterAndSort(properties, {
  search: search.value,
  minPrice: minPrice.value,
  maxPrice: maxPrice.value,
  sort: sort.value,
  favsOnly: favsOnly.value,
  bookmarks: bookmarks.value,
}))
</script>

<template>
  <main>
    <ListingHeader :total="properties.length" :active="filtered.length" :bookmarks="bookmarks.length" v-model:view="view" />

    <SearchSortBar
      v-model="search"
      v-model:sort="sort"
      v-model:minPrice="minPrice"
      v-model:maxPrice="maxPrice"
      v-model:favsOnly="favsOnly"
      :rangeMax="rangeMax"
      @clear="clearFilters"
    />

    <transition-group name="list" tag="div" class="grid">
      <PropertyCard
        v-for="prop in filtered"
        :key="prop.id"
        :property="prop"
        :bookmarked="bookmarks.includes(prop.id)"
        @toggle-bookmark="toggleBookmark"
      />
    </transition-group>
    <div v-if="filtered.length === 0" class="no-results">
      No properties match your search.
    </div>
  </main>
</template>

<style scoped>
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
.no-results { margin-top: 1rem; color: var(--color-text); opacity: 0.9 }
@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.list-enter-from, .list-leave-to { opacity: 0; transform: translateY(8px) scale(.98) }
.list-enter-active, .list-leave-active { transition: all 320ms cubic-bezier(.2,.8,.2,1) }
.list-move { transition: transform 320ms cubic-bezier(.2,.8,.2,1) }

.card { transition: transform 220ms ease, box-shadow 220ms ease }
.card:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(0,0,0,0.06) }

</style>
