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
        <li v-for="link in links" :key="link.href">
          <a :href="link.href" @click="close">{{ link.label }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);
const toggle = () => (isOpen.value = !isOpen.value);
const close = () => (isOpen.value = false);

const links = [
  { label: "Approach", href: "/approach" },
  { label: "Practices", href: "/practices" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
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

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }
  .mobile-menu {
    display: block;
  }
}
</style>
