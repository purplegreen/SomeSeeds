<template>
  <div class="dropdown" @mouseenter="open" @mouseleave="close">
    <button
      class="dropdown__trigger navbar__link underline-hover"
      :class="{ 'navbar__link--active': isActive }"
    >
      {{ label }}
    </button>

    <div class="dropdown__menu" :class="{ open: isOpen }">
      <div class="dropdown__items">
        <div
          v-for="exploration in explorations"
          :key="exploration.slug"
          class="dropdown__exploration"
        >
          <a
            :href="`/explorations/${exploration.slug}`"
            class="dropdown__exploration-title"
            :class="{
              'navbar__link--active':
                currentPath === `/explorations/${exploration.slug}`,
            }"
            @click="close"
          >
            {{ exploration.title }}
          </a>

          <ul
            v-if="exploration.activations && exploration.activations.length > 0"
            class="dropdown__activations"
          >
            <li
              v-for="activation in exploration.activations"
              :key="activation.slug"
            >
              <a
                :href="`/activations/${activation.slug}`"
                class="dropdown__activation-item"
                @click="close"
              >
                <span class="activation_dot"
                  ><img src="/activation_dot.svg" alt="description"
                /></span>
                <span class="dropdown__activation-title">{{
                  activation.title
                }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  explorations: {
    type: Array,
    default: () => [],
  },
  currentPath: {
    type: String,
    default: "",
  },
  label: {
    type: String,
  },
});

const isOpen = ref(false);
const open = () => (isOpen.value = true);
const close = () => (isOpen.value = false);

const isActive = computed(() => props.currentPath.startsWith("/explorations"));
</script>

<style scoped>
.dropdown {
  position: static;
  display: flex;
  align-items: flex-end;
}

.dropdown__trigger {
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: var(--text-s);
  font-weight: 600;
  font-family: inherit;
  height: 4rem;
  align-items: center;
  z-index: 50;
}

.dropdown__menu {
  display: none;
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 4rem 1rem;
  background: none;
  width: auto;
  z-index: 100;
  flex-direction: column;
  align-items: flex-end;
}

.dropdown__menu.open {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.dropdown__items {
  display: grid;
  width: 98vw;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  padding-top: 0.7rem;
  background-color: var(--color-white);
}

.dropdown__exploration {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: 0.2rem;
}

.navbar__links a.navbar__link--active {
  text-decoration: underline;
  text-decoration-color: var(--color-primary);
  text-underline-offset: var(--space-0);
  text-decoration-thickness: 3px;
}

.dropdown__exploration-title {
  font-size: var(--text-base);
  line-height: var(--line-height-snug);
  font-weight: 700;
  text-decoration: none;
}

.dropdown__activations {
  font-size: var(--text-base);
  color: var(--color-neutral-700);
  font-weight: 600;
  list-style: none;
  padding: 0.25rem;
  display: flex;
  gap: 0px;
}

.dropdown__activation-item {
  display: flex;
  line-height: var(--line-height-flat);
  text-decoration: none;
  display: flex;
  align-items: start;
  justify-content: start;
  gap: 0px;
  border: 1px solid red;
}

.activation_dot {
  width: 1rem;
  height: auto;
}

.dropdown__exploration-title,
.dropdown__activation-item {
  background-color: var(--color-white);
  border-radius: var(--radius-xl);
  padding: 0.24rem;
}

.dropdown__exploration-title:hover,
.dropdown__activation-item:hover {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
}

.dropdown__activation-status {
  font-size: var(--text-xs, 0.75rem);
  opacity: 0.6;
  text-transform: capitalize;
  white-space: nowrap;
}

.dropdown__no-activations {
  font-size: var(--text-xs, 0.75rem);
  opacity: 0.4;
  margin: 0;
  padding-left: 0.75rem;
}
.dropdown__menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
</style>
