<template>
  <a :href="`/activations/${slug}`" class="activation-card">
    <div v-if="coverImage" class="activation-card__image">
      <img :src="coverImage" :alt="title" />
      <div
        v-if="explorations && explorations.length > 0"
        class="activation-card__overlay"
      >
        <div class="activation-card__overlay-content">
          <p class="activation-card__overlay-label">
            Contributing to the Exploration:
          </p>
          <div class="activation-card__overlay-explorations">
            <a
              v-for="exploration in explorations"
              :key="exploration.slug"
              :href="`/explorations/${exploration.slug}`"
              class="activation-card__overlay-item"
              @click.stop
            >
              {{ exploration.title }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="activation-card__body">
      <div class="activation-card__tags">
        <CategoryTag v-if="type" :label="type" />
      </div>
      <div
        v-if="partnerInstitutions && partnerInstitutions.length > 0"
        class="activation-card__partners"
      >
        <template v-for="p in partnerInstitutions" :key="p.name">
          <img
            v-if="p && p.logo"
            :src="p.logo"
            :alt="p.name ?? ''"
            class="activation-card__partner-logo"
          />
        </template>
      </div>
      <p v-if="dateDisplay" class="activation-card__date">{{ dateDisplay }}</p>
      <p v-if="locationDisplay" class="activation-card__location">
        {{ locationDisplay }}
      </p>

      <h3 class="activation-card__title">{{ title }}</h3>
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
  explorations: Array,
  partnerInstitutions: Array,
});

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
};

const dateDisplay = computed(() => {
  if (!props.startDate) return "";

  const isSameDay =
    props.endDate &&
    new Date(props.startDate).toDateString() ===
      new Date(props.endDate).toDateString();
  const isMultiDay = props.endDate && !isSameDay;

  if (isMultiDay) {
    const startDay = new Date(props.startDate).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      timeZone: "UTC",
    });
    const endFull = new Date(props.endDate).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
    return `${startDay}–${endFull}`;
  }

  let display = formatDate(props.startDate);
  if (props.startTime) {
    display += ` · ${props.startTime}`;
    if (props.endTime) display += `–${props.endTime}`;
  }
  return display;
});

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
  max-width: 40vw;
  height: 94%;
  text-decoration: none;
  border-radius: var(--radius-lg);
  color: var(--color-primary);
  border: 0.5px solid var(--color-white);
  background-color: var(--color-white);
}

.activation-card:hover {
  color: var(--color-primary);
  transition: opacity 0.3s ease;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
}

.activation-card__image {
  position: relative;
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

.activation-card__overlay {
  position: absolute;
  bottom: 25%;
  left: 5%;
  width: 12rem;
  height: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
  background-color: white;
  border-radius: 50%;
}

.activation-card:hover .activation-card__overlay {
  opacity: 1;
}

.activation-card__overlay-content {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: var(--space-4);
  padding: var(--space-6);
  text-align: center;
  transform: rotate(-20deg);
}

.activation-card__overlay-label {
  font-size: var(--text-s);
  line-height: var(--line-height-snug);
  opacity: 0.7;
  margin: 0;
  letter-spacing: 0.05em;
}

.activation-card__overlay-explorations {
  width: 100%;
  font-size: var(--text-m);
  line-height: var(--line-height-snug);
  line-break: normal;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  align-items: center;
}

.activation-card__overlay-item {
  color: var(--color-white);
  text-decoration: none;
  font-size: var(--text-l);
  font-weight: 600;
  line-height: var(--line-height-snug);
  background: white;
  color: black;
  text-align: center;
}

.activation-card__overlay-item:hover {
  text-decoration: underline;
  background-color: var(--color-white);
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
  font-size: var(--text-3xl);
  line-height: var(--line-height-tight);
  font-weight: 600;
  margin: 0;
}

.activation-card__date,
.activation-card__location {
  font-size: var(--text-big);
  line-height: var(--line-height-snug);
  color: var(--color-primary);
  margin: 0;
}

.activation-card__partners {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  align-items: center;
  margin-top: var(--space-0);
  padding-bottom: var(--space-4);
}

.activation-card__partner-logo {
  height: 2rem;
  width: auto;
}

@media (max-width: 768px) {
  a.activation-card {
    width: 100%;
  }
  @media (max-width: 480px) {
  }
}
</style>
