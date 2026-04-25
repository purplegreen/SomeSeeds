<template>
  <a :href="`/activations/${slug}`" class="activation-card">
    <div v-if="coverImage" class="activation-card__image">
      <img :src="coverImage" :alt="title" />
    </div>

    <div class="activation-card__body">
      <div class="activation-card__tags">
        <CategoryTag v-if="type" :label="type" />
      </div>

      <h3 class="activation-card__title">{{ title }}</h3>

      <p v-if="dateDisplay" class="activation-card__date">{{ dateDisplay }}</p>
      <p v-if="locationDisplay" class="activation-card__location">
        {{ locationDisplay }}
      </p>
    </div>
  </a>
</template>

<script setup>
import { computed } from "vue";
import CategoryTag from "./CategoryTag.vue";

const props = defineProps({
  title: String,
  slug: String,
  type: String,
  startDate: String,
  startTime: String,
  endDate: String,
  endTime: String,
  location: Object,
  coverImage: String,
});

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
    timeZone: 'UTC'
  })
}

const dateDisplay = computed(() => {
  if (!props.startDate) return ''

  const isSameDay = props.endDate &&
    new Date(props.startDate).toDateString() === new Date(props.endDate).toDateString()
  const isMultiDay = props.endDate && !isSameDay

  if (isMultiDay) {
    const startDay = new Date(props.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' })
    const endFull = new Date(props.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    return `${startDay}–${endFull}`
  }

  let display = formatDate(props.startDate)
  if (props.startTime) {
    display += ` · ${props.startTime}`
    if (props.endTime) display += `–${props.endTime}`
  }
  return display
})

const locationDisplay = computed(() => {
  if (!props.location) return null;
  return [props.location.venue, props.location.city, props.location.country]
    .filter(Boolean)
    .join(", ");
});
</script>

<style scoped>
.activation-card {
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

.activation-card:hover {
  color: var(--color-primary);
  box-shadow: 0 0.8rem 3.2rem var(--color-neutral-400);
  transform: translate(-0.2%);
}

.activation-card__image {
  width: 100%;
  min-height: 0;
  flex: 1;
  overflow: hidden;
}

.activation-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.activation-card__body {
  display: flex;
  flex-direction: column;
  padding: var(--space-3);
  flex-shrink: 0;
}

.activation-card__tags {
  padding-bottom: var(--space-2);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-0);
}

.activation-card__title {
  font-size: var(--text-xl);
  line-height: var(--line-height-tight);
  font-weight: 600;
  margin: 0;
}

.activation-card__date,
.activation-card__location {
  font-size: var(--text-s);
  color: var(--color-primary);
  margin: 0;
}

@media (max-width: 768px) {
  a.activation-card {
    width: 100%;
  }
  @media (max-width: 480px) {
  }
}
</style>
