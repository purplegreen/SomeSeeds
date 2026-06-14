<template>
  <div class="dropdown" @mouseenter="open" @mouseleave="close">
    <button
      class="dropdown__trigger navbar__link underline-hover"
      :class="{ 'navbar__link--active': isActive }"
    >
      {{ label }}
    </button>

    <Transition name="dropdown">
    <div class="dropdown__menu" v-if="isOpen">
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
                :class="{
                  'navbar__link--active':
                    currentPath === `/activations/${activation.slug}`,
                }"
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
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from "vue";

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

const isActive = computed(
  () =>
    props.currentPath.startsWith("/explorations") ||
    props.currentPath.startsWith("/activations")
);

// Pin the navbar in place while the dropdown is open (via the .nav-dropdown-open
// class) so it doesn't drift away on scroll under the full-viewport overlay.
watch(isOpen, (open) => {
  document.documentElement.classList.toggle("nav-dropdown-open", open);
});

onUnmounted(() => {
  document.documentElement.classList.remove("nav-dropdown-open");
});
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
  font-size: var(--text-m);
  font-weight: 600;
  font-family: inherit;
  height: 4rem;
  align-items: center;
  z-index: 50;
}

.dropdown__trigger.navbar__link--active {
  text-decoration: underline;
  text-decoration-color: var(--color-primary);
  text-underline-offset: var(--space-2);
  text-decoration-thickness: 3px;
}

.dropdown__menu {
  display: flex;
  position: fixed;
  top: 4rem;
  left: 0;
  width: 100vw;
  height: calc(100vh - 4rem);
  z-index: 100;
  padding: 1rem 2rem;
  background-color: var(--color-white);
  box-shadow: 0 0.2rem 0.2rem var(--color-neutral-200);
  align-items: flex-start;
  justify-content: flex-start;
  overflow-y: auto;
}

/* Panel is anchored under the navbar and unrolls top -> bottom (clip-path
   reveal), so it never overlaps the navbar it lives inside. */
.dropdown-enter-active {
  transition: clip-path 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.dropdown-leave-active {
  transition: clip-path 0.32s cubic-bezier(0.55, 0, 1, 0.45);
}

.dropdown-enter-from,
.dropdown-leave-to {
  clip-path: inset(0 0 100% 0);
}

.dropdown-enter-to,
.dropdown-leave-from {
  clip-path: inset(0 0 0 0);
}

.dropdown__items {
  display: grid;
  width: 100vw;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  padding-top: 0.7rem;
}

.dropdown__exploration {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.75rem;
}

.navbar__links a.navbar__link--active {
  text-decoration: underline;
  text-decoration-color: var(--color-primary);
  text-underline-offset: var(--space-0);
  text-decoration-thickness: 3px;
}

.dropdown__exploration-title {
  font-size: var(--text-body);
  line-height: var(--line-height-snug);
  font-weight: 700;
  text-decoration: none;
}

.dropdown__activations {
  font-size: var(--text-m);
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
  gap: 4px;
}

.activation_dot {
  flex: 0 0 1rem;
  height: auto;
}

.dropdown__exploration-title,
.dropdown__activation-item {
  background-color: var(--color-white);
  border-radius: var(--radius-xl);
  padding: 0.5rem;
}

.dropdown__exploration-title:hover,
.dropdown__activation-item:hover,
.dropdown__activation-item.navbar__link--active {
  text-decoration: underline;
  color: var(--color-primary);
  text-underline-offset: var(--space-0);
  text-decoration-thickness: 3px;
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
