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
      <!-- 1. Fixed top: regular links + Explorations heading -->
      <div class="mobile-menu__top">
        <ul class="mobile-menu__links">
          <li v-for="link in regularLinks" :key="link.href">
            <a :href="link.href" @click="close">{{ link.label }}</a>
          </li>
        </ul>
        <p v-if="explorations.length > 0" class="mobile-menu__heading">
          Explorations
        </p>
      </div>

      <!-- 2. Scrollable middle: explorations + activations (always expanded) -->
      <ul v-if="explorations.length > 0" class="mobile-menu__list">
        <li
          v-for="exploration in explorations"
          :key="exploration.slug"
          class="mobile-exploration"
        >
          <a
            :href="`/explorations/${exploration.slug}`"
            class="mobile-exploration__title"
            @click="close"
          >
            {{ exploration.title }}
          </a>
          <!-- Activations indented under each exploration -->
          <ul
            v-if="exploration.activations && exploration.activations.length > 0"
            class="mobile-activations"
          >
            <li
              v-for="activation in exploration.activations"
              :key="activation.slug"
            >
              <a
                :href="`/activations/${activation.slug}`"
                class="mobile-activation"
                @click="close"
              >
                <span class="activation_dot"
                  ><img src="/activation_dot.svg" alt=""
                /></span>
                <span>{{ activation.title }}</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>

      <!-- 3. Pinned bottom CTA -->
      <a
        v-if="ctaLink"
        :href="ctaLink.href"
        class="mobile-menu__cta"
        @click="close"
      >
        {{ ctaLink.label }}
      </a>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from "vue";

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
  ctaLink: {
    type: Object,
    default: null,
  },
});

// filter out /explorations from regular links to avoid duplication
const regularLinks = computed(() =>
  props.links.filter((l) => l.href !== "/explorations"),
);

const isOpen = ref(false);

const toggle = () => (isOpen.value = !isOpen.value);
const close = () => (isOpen.value = false);

// Pin the navbar (logo + close button) in place while the drawer is open so it
// stays visible on top of the full-screen overlay even when the page is scrolled.
watch(isOpen, (open) => {
  document.documentElement.classList.toggle("mobile-menu-open", open);
});

onUnmounted(() => {
  document.documentElement.classList.remove("mobile-menu-open");
});
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
  /* Top padding = navbar height (4.5rem: 4rem logo + 2×0.25rem padding) + 1.5rem
     so the gap below the logo matches the gap between nav items. */
  padding: 6rem 2rem 2rem;
  /* The drawer itself doesn't scroll — only the middle list zone does. */
  flex-direction: column;
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

/* 1. Fixed top zone: regular links + Explorations heading */
.mobile-menu__top {
  flex: 0 0 auto;
}

.mobile-menu__heading {
  margin: 1.5rem 0 0;
  font-size: 1.5rem;
  font-weight: 500;
  color: #1a1a1a;
  letter-spacing: -0.3px;
}

/* 2. Scrollable middle zone: explorations + activations */
.mobile-menu__list {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  gap: 1.25rem !important;
  margin-top: 1.25rem !important;
  padding-left: 0.5rem !important;
}

.mobile-exploration {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-menu .mobile-exploration__title {
  font-size: 1.2rem;
  font-weight: 600;
}

/* Activations: indented, always visible under their exploration */
.mobile-activations {
  display: flex;
  flex-direction: column;
  gap: 0.5rem !important;
  padding-left: 1rem !important;
}

.mobile-activation {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1rem !important;
  font-weight: 500;
  color: var(--color-neutral-700);
}

.mobile-activation .activation_dot {
  flex: 0 0 0.9rem;
  display: flex;
  align-items: center;
}

.mobile-activation .activation_dot img {
  width: 0.9rem;
  height: auto;
}

/* 3. Pinned bottom CTA — a pill button kept at the foot of the drawer */
.mobile-menu .mobile-menu__cta {
  flex: 0 0 auto;
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  margin-top: 1.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.6rem 1.4rem;
  border: 2px solid #1a1a1a;
  border-radius: var(--radius-xl);
  transition: background-color 0.15s ease, color 0.15s ease;
}

.mobile-menu .mobile-menu__cta:hover {
  background-color: #1a1a1a;
  color: #ffffff;
  opacity: 1;
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }
  .mobile-menu {
    display: flex;
  }
}
</style>
