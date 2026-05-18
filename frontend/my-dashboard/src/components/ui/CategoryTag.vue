<template>
  <component :is="href ? 'a' : 'span'" :href="href" class="category-tag">
    {{ label }}
  </component>
</template>

<script setup>
defineProps({ label: String, href: String });
</script>

<style scoped>
.category-tag {
  display: inline-flex;
  align-items: center;
  font-size: var(--text-m);
  font-weight: 300;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 0.15s ease;
}
.category-tag:hover {
  opacity: 0.7;
}
</style>
