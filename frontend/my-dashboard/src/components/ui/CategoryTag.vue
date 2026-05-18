<template>
  <component :is="href ? 'a' : 'span'" :href="href" class="category-tag">
    {{ label }}
  </component>
</template>

<script setup>
defineProps({ label: String, href: String });
</script>
