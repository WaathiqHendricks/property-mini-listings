<script setup>
import { defineEmits, defineProps } from 'vue'
const props = defineProps({
  property: { type: Object, required: true },
  bookmarked: { type: Boolean, default: false }
})
const emit = defineEmits(['toggle-bookmark'])
function toggleBookmark() {
  emit('toggle-bookmark', props.property.id)
}
</script>

<template>
  <article class="card">
    <div class="image-wrap">
      <img :src="property.image" :alt="property.title" />
      <div v-if="!property.available" class="ribbon">Not Available</div>
      <button class="bookmark" @click="toggleBookmark" :aria-pressed="bookmarked" :aria-label="bookmarked ? 'Remove bookmark' : 'Add bookmark'" title="Toggle favourite">
        <span v-if="bookmarked">★</span>
        <span v-else>☆</span>
      </button>
    </div>

    <div class="card-body">
      <h3>{{ property.title }}</h3>
      <div class="meta">
        <span class="price">R{{ property.price }} / night</span>
        <span class="type">{{ property.type }}</span>
      </div>
      <p class="location">{{ property.location }}</p>
    </div>
  </article>
</template>

<style scoped>
.card {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--color-background-soft);
}
.image-wrap { position: relative; }
.image-wrap img { width: 100%; height: 180px; object-fit: cover; display:block; }
.ribbon {
  position: absolute;
  left: 10px;
  top: 10px;
  background: #ff5a5f;
  color: white;
  padding: 5px 8px;
  font-size: 0.85rem;
  border-radius: 5px;
}
.bookmark {
  position: absolute;
  right: 10px;
  top: 10px;
  background: rgba(255,255,255,0.85);
  border: none;
  padding: 6px 8px;
  border-radius: 5px;
  cursor: pointer;
}
.card-body { padding: 1rem; }
.card-body h3 { margin: 0 0 0.5rem 0; }
.meta { display:flex; gap:0.6rem; margin-bottom:0.5rem; font-weight:600 }
.price { color: #2c7a7b }
.location { color: var(--color-text); opacity:0.8 }
</style>
