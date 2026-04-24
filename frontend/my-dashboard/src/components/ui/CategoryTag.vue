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
  font-size: var(--text-s);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.75rem;
  border: 2px solid var(--color-primary);
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 0.15s ease;
}
.category-tag:hover {
  opacity: 0.7;
}
</style>
