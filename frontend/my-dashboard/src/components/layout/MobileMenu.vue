<template>
  <div class="mobile-menu-wrapper">
    <button
      class="hamburger"
      :class="{ open: isOpen }"
      @click="toggle"
      aria-label="Toggle menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <nav class="mobile-menu" :class="{ open: isOpen }">
      <ul>
        <li v-for="link in regularLinks" :key="link.href">
          <a :href="link.href" @click="close">{{ link.label }}</a>
        </li>
        <!-- Explorations submenu -->
        <li v-if="explorations.length > 0">
          <ul class="mobile-submenu" :class="{ open: explorationsOpen }">
            <li v-for="exploration in explorations" :key="exploration.slug">
              <a :href="`/explorations/${exploration.slug}`" @click="close">
                {{ exploration.title }}
              </a>
              <!-- Activations nested under each exploration -->
              <ul
                v-if="
                  exploration.activations && exploration.activations.length > 0
                "
                class="mobile-submenu mobile-submenu--nested"
              >
                <li
                  v-for="activation in exploration.activations"
                  :key="activation.slug"
                >
                  <a :href="`/activations/${activation.slug}`" @click="close">
                    {{ activation.title }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  links: {
    type: Array,
    default: () => [],
  },
  explorations: {
    type: Array,
    default: () => [],
  },
  currentPath: {
    type: String,
    default: "",
  },
});

// filter out /explorations from regular links to avoid duplication
const regularLinks = computed(() =>
  props.links.filter((l) => l.href !== "/explorations"),
);

const isOpen = ref(false);
const explorationsOpen = ref(false);

const toggle = () => (isOpen.value = !isOpen.value);
const close = () => {
  isOpen.value = false;
  explorationsOpen.value = false;
};
const toggleExplorations = () =>
  (explorationsOpen.value = !explorationsOpen.value);
</script>

<style scoped>
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  z-index: 100;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: #1a1a1a;
  transition: all 0.25s ease;
  transform-origin: center;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger.open span:nth-child(2) {
  opacity: 0;
}
.hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.mobile-menu {
  display: none;
  position: fixed;
  inset: 0;
  background: #ffffff;
  z-index: 99;
  padding: 5rem 2rem 2rem;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.mobile-menu.open {
  transform: translateX(0);
}

.mobile-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mobile-menu a {
  font-size: 1.5rem;
  color: #1a1a1a;
  text-decoration: none;
  font-weight: 500;
  letter-spacing: -0.3px;
}

.mobile-menu a:hover {
  opacity: 0.5;
}

.mobile-submenu__trigger {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #1a1a1a;
  font-weight: 500;
  padding: 0;
  font-family: inherit;
  letter-spacing: -0.3px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mobile-submenu__arrow {
  display: inline-block;
  transition: transform 0.2s ease;
  font-style: normal;
}

.mobile-submenu__arrow.open {
  transform: rotate(180deg);
}

.mobile-submenu {
  display: none;
  padding-left: 1rem !important;
  gap: 1rem !important;
  margin-top: 0.75rem;
}
.mobile-submenu.open {
  display: flex;
}

.mobile-submenu a {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }
  .mobile-menu {
    display: block;
  }
}
</style>
