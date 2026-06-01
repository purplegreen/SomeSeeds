<template>
  <a :href="`/explorations/${slug}`" class="exploration-card">
    <div v-if="coverImage" class="exploration-card__image">
      <img :src="coverImage" :alt="title" />
    </div>

    <div class="exploration-card__body">
      <h3 class="exploration-card__title">{{ title }}</h3>
      <p v-if="summary" class="exploration-card__summary">{{ summary }}</p>
    </div>
  </a>
</template>

<script setup>
defineProps({
  title: String,
  slug: String,
  summary: String,
  coverImage: String,
});
</script>

<style scoped>
.exploration-card {
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow: hidden;
  min-width: 0;
  max-width: 48vw;
  height: 80vh;
  text-decoration: none;
  border-radius: var(--radius-s);
  color: var(--color-primary);
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.exploration-card:hover {
  color: var(--color-primary);
  box-shadow: 0 0.8rem 3.2rem var(--color-neutral-400);
  transform: translate(-0.2%);
}

.exploration-card__image {
  width: 100%;
  min-height: 0;
  flex: 1;
  overflow: hidden;
}

.exploration-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.exploration-card__body {
  display: flex;
  flex-direction: column;
  padding: var(--space-3);
  flex-shrink: 0;
}

.exploration-card__title {
  font-size: var(--text-xl);
  line-height: var(--line-height-tight);
  font-weight: 600;
  margin: 0;
}

.exploration-card__summary {
  font-size: var(--text-s);
  margin: var(--space-2) 0 0;
  opacity: 0.7;
  line-height: var(--line-height-snug);
}
</style>
