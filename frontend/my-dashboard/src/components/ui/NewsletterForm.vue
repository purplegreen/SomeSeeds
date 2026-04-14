<template>
  <div class="newsletter">
    <p class="newsletter__label">Stay updated</p>
    <div class="newsletter__form">
      <input
        v-model="email"
        type="email"
        placeholder="your@email.com"
        class="newsletter__input"
        :disabled="submitted"
      />
      <button
        class="newsletter__btn"
        :disabled="!email || submitted"
        @click="submit"
      >
        {{ submitted ? "✓" : "Subscribe" }}
      </button>
    </div>
    <p v-if="submitted" class="newsletter__success">Thanks for subscribing!</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const submitted = ref(false);

function submit() {
  if (!email.value) return;
  // TODO: connect to your mailing service (Mailchimp, Resend, etc.)
  console.log("Subscribe:", email.value);
  submitted.value = true;
}
</script>

<style scoped>
.newsletter__label {
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
  max-width: none;
}

.newsletter__form {
  display: flex;
  gap: var(--space-2);
}

.newsletter__input {
  flex: 1;
  font-family: var(--font-base);
  font-size: var(--text-sm);
  padding: 0.6rem var(--space-4);
  border: var(--border-default);
  border-radius: var(--radius-md);
  background: var(--color-background);
  color: var(--color-text-primary);
  outline: none;
  transition: border-color var(--transition-fast);
}

.newsletter__input:focus {
  border-color: var(--color-accent);
}

.newsletter__btn {
  font-family: var(--font-base);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  padding: 0.6rem var(--space-4);
  background: var(--color-accent);
  color: #ffffff;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color var(--transition-fast);
  white-space: nowrap;
}

.newsletter__btn:hover:not(:disabled) {
  background: var(--color-accent-hover);
}

.newsletter__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.newsletter__success {
  font-size: var(--text-xs);
  color: var(--color-success);
  margin-top: var(--space-2);
  max-width: none;
}
</style>
