<template>
  <a :href="`/explorations/${slug}`" class="exploration-card">
    <div v-if="coverImage" class="exploration-card__image">
      <img :src="coverImage" :alt="title" />
      <div class="exploration-card__tag">
        <svg viewBox="0 0 100 100" width="64" height="64">
          <defs>
            <path
              id="circle-text"
              d="M 50,50 m -30,0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0"
            />
          </defs>
          <text
            font-size="16"
            fill="currentColor"
            font-weight="600"
            letter-spacing="4"
          >
            <textPath href="#circle-text">EXPLORATION ·</textPath>
          </text>
        </svg>
      </div>
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
  max-width: 40vw;
  height: 94%;
  text-decoration: none;
  border-radius: 4px;
  color: var(--color-primary);
  border: 0.5px solid var(--color-white);
}

.exploration-card:hover {
  color: var(--color-primary);
  border: 0.5px solid var(--color-primary);
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

.exploration-card__image {
  position: relative; /* needed for absolute positioning of badge */
  width: 100%;
  min-height: 0;
  flex: 1;
  overflow: hidden;
}

.exploration-card__tag {
  position: absolute;
  top: var(--space-3);
  left: var(--space-3);
  width: 8rem;
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: spin 8s linear infinite;
  z-index: 2;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.exploration-card__body {
  display: flex;
  flex-direction: column;
  padding: var(--space-3);
  flex-shrink: 0;
}

.exploration-card__title {
  font-size: var(--text-3xl);
  line-height: var(--line-height-tight);
  font-weight: 600;
  margin: 0;
}

.exploration-card__summary {
  font-size: var(--text-big);
  margin: var(--space-2) 0 0;
  opacity: 0.7;
  line-height: var(--line-height-snug);
}

@media (max-width: 768px) {
  a.activation-card {
    width: 100%;
  }
  @media (max-width: 480px) {
  }
}
</style>
