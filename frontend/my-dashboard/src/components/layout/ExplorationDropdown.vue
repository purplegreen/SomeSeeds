<template>
  <div class="dropdown" @mouseenter="open" @mouseleave="close">
    <button
      class="dropdown__trigger navbar__link"
      :class="{ 'navbar__link--active': isActive }"
    >
      Explorations
    </button>

    <div class="dropdown__menu" :class="{ open: isOpen }">
      <ul>
        <li v-for="exploration in explorations" :key="exploration.slug">
          <a
            :href="`/explorations/${exploration.slug}`"
            class="dropdown__item"
            @click="close"
          >
            {{ exploration.title }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  explorations: {
    type: Array,
    default: () => [],
  },
  currentPath: {
    type: String,
    default: "",
  },
});

console.log("dropdown explorations:", props.explorations);
const isOpen = ref(false);
const open = () => (isOpen.value = true);
const close = () => (isOpen.value = false);

const isActive = props.currentPath.startsWith("/explorations");
</script>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown__trigger {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: var(--text-s);
  font-weight: 600;
  font-family: inherit;
}

.dropdown__menu {
  display: none;
  position: absolute;
  top: calc(100% + 1rem);
  right: 0;
  background: var(--color-bg, #fff);
  border: 1px solid var(--color-border, #e5e5e5);
  padding: 1rem;
  min-width: 220px;
  z-index: 100;
}

.dropdown__menu.open {
  display: block;
}

.dropdown__menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.dropdown__item {
  font-size: var(--text-s);
  font-weight: 500;
  text-decoration: none;
  display: block;
  transition: opacity 0.15s ease;
}

.dropdown__item:hover {
  text-decoration: underline;
  text-underline-offset: var(--space-2);
  text-decoration-thickness: 3px;
}
</style>
