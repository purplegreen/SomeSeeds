<template>
  <div class="dropdown" @mouseenter="open" @mouseleave="close">
    <button
      class="dropdown__trigger navbar__link"
      :class="{ 'navbar__link--active': isActive }"
    >
      {{ label }}
    </button>

    <div class="dropdown__menu" :class="{ open: isOpen }">
      <div
        v-for="exploration in explorations"
        :key="exploration.slug"
        class="dropdown__exploration"
      >
        <a
          :href="`/explorations/${exploration.slug}`"
          class="dropdown__exploration-title"
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
              href="`/activations/${activation.slug}`"
              class="dropdown__activation-item"
              @click="close"
            >
              <span class="dropdown__activation-title">{{
                activation.title
              }}</span>
              <span
                v-if="activation.status"
                class="dropdown__activation-status"
                :class="`status--${activation.status}`"
              >
                {{ activation.status }}
              </span>
            </a>
          </li>
        </ul>
        <p v-else class="dropdown__no-activations"></p>
      </div>
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
  label: {
    type: String,
  },
});

const isOpen = ref(false);
const open = () => (isOpen.value = true);
const close = () => (isOpen.value = false);

const isActive = props.currentPath.startsWith("/explorations");
</script>

<style scoped>
.dropdown {
  position: static;
}

.dropdown__trigger {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: var(--text-s);
  font-weight: 600;
  font-family: inherit;
  height: 4.5rem;
}

.dropdown__menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--color-bg, #ffffff);
  padding: 1.5rem;
  width: 100vw;
  z-index: 100;
  display: none;
  flex-direction: column;
  gap: 1.5rem;
}

.dropdown__menu.open {
  display: flex;
}

/*.dropdown__exploration {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

}

.dropdown__exploration-title {
  font-size: var(--text-s);
  font-weight: 600;
  text-decoration: none;
}
*/
.dropdown__exploration-title:hover {
  text-decoration: underline;
  text-underline-offset: var(--space-2);
  text-decoration-thickness: 3px;
}

.dropdown__activations {
  list-style: none;
  margin: 0;
  padding: 0 0 0 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  border-left: 2px solid var(--color-border, #e5e5e5);
}

.dropdown__activation-item {
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.dropdown__activation-item:hover .dropdown__activation-title {
  text-decoration: underline;
  text-underline-offset: var(--space-2);
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
  gap: 0.75rem;
}
</style>
