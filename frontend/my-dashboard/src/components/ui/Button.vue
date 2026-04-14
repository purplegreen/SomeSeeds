<template>
  <!-- Renders as <a> when href is provided, <button> otherwise -->
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :type="href ? undefined : type"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'btn--disabled': disabled }]"
    :disabled="!href && disabled"
    @click="!disabled && $emit('click', $event)"
  >
    <span v-if="$slots.icon" class="btn__icon">
      <slot name="icon" />
    </span>
    <span class="btn__label">
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: string;
    size?: string;
    href?: string | null;
    type?: string;
    disabled?: boolean;
  }>(),
  {
    variant: "primary",
    size: "md",
    href: null,
    type: "button",
    disabled: false,
  },
);

defineEmits(["click"]);
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-base);
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.01em;
  border-radius: var(--radius-md);
  cursor: pointer;
  text-decoration: none;
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast),
    border-color var(--transition-fast),
    box-shadow var(--transition-fast),
    transform var(--transition-fast);
  white-space: nowrap;
  border: 2px solid transparent;
}

.btn:active:not(.btn--disabled) {
  transform: translateY(1px);
}

/* ── Sizes ── */
.btn--sm {
  font-size: var(--text-xs);
  padding: 0.4rem 0.875rem;
}

.btn--md {
  font-size: var(--text-sm);
  padding: 0.6rem 1.25rem;
}

.btn--lg {
  font-size: var(--text-base);
  padding: 0.8rem 1.75rem;
}

/* ── Primary ── */
.btn--primary {
  background-color: var(--color-accent);
  color: #ffffff;
  border-color: var(--color-accent);
}

.btn--primary:hover:not(.btn--disabled) {
  background-color: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
  box-shadow: var(--shadow-md);
}

/* ── Secondary ── */
.btn--secondary {
  background-color: transparent;
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.btn--secondary:hover:not(.btn--disabled) {
  background-color: var(--color-accent);
  color: #ffffff;
  box-shadow: var(--shadow-md);
}

/* ── Disabled ── */
.btn--disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* ── Icon ── */
.btn__icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}
</style>
