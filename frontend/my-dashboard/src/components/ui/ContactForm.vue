<template>
  <form class="contact-form" @submit.prevent="handleSubmit">
    <div v-if="!submitted" class="contact-form__body">
      <div v-for="field in formFields" :key="field.fieldKey" class="field">
        <label :for="field.fieldKey" class="field__label">
          {{ field.label
          }}<span v-if="field.required" aria-hidden="true"> *</span>
        </label>
        <textarea
          v-if="field.fieldType === 'textarea'"
          :id="field.fieldKey"
          v-model="values[field.fieldKey]"
          :placeholder="field.placeholder ?? ''"
          :required="field.required"
          class="field__input field__input--textarea"
        />
        <input
          v-else
          :id="field.fieldKey"
          v-model="values[field.fieldKey]"
          :type="field.fieldType"
          :placeholder="field.placeholder ?? ''"
          :required="field.required"
          class="field__input"
        />
      </div>

      <p v-if="errorMsg" class="form-error" role="alert">{{ errorMsg }}</p>

      <div class="form-actions">
        <Button type="submit" :disabled="pending" variant="primary" size="md">
          {{ pending ? "Sending…" : (submitButtonLabel ?? "Send message") }}
        </Button>
      </div>
    </div>

    <p v-else class="form-success" role="status">
      {{ successMessage ?? "Thank you — we'll be in touch soon." }}
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import Button from "./Button.vue";

interface FormField {
  label: string;
  fieldKey: string;
  fieldType: "text" | "email" | "textarea";
  placeholder?: string;
  required?: boolean;
}

const props = defineProps<{
  formFields: FormField[];
  submitButtonLabel?: string;
  successMessage?: string;
}>();

const values = reactive<Record<string, string>>(
  Object.fromEntries(props.formFields.map((f) => [f.fieldKey, ""])),
);
const pending = ref(false);
const submitted = ref(false);
const errorMsg = ref("");

async function handleSubmit() {
  pending.value = true;
  errorMsg.value = "";

  const fields = Object.fromEntries(
    props.formFields.map((f) => [f.label, values[f.fieldKey]]),
  );

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
    submitted.value = true;
  } catch (err) {
    errorMsg.value =
      err instanceof Error ? err.message : "Something went wrong.";
  } finally {
    pending.value = false;
  }
}
</script>

<style scoped>
.contact-form {
  display: flex;
  flex-direction: column;
}

.contact-form__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-0);
}

.field__label {
  font-size: var(--text-s);
  font-weight: 600;
}

.field__input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border-bottom: 3px solid var(--color-primary);
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: var(--radius-s);
  background: var(--color-neutral-surface);
  color: inherit;
  font-size: var(--text-s);
  font-family: inherit;
  outline: none;
}

.field__input:focus {
  outline: 1px solid var(--color-neutral-300);
  outline-offset: 2px;
  outline-offset: 2px;
}

.field__input--textarea {
  resize: vertical;
  min-height: 140px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.form-error {
  color: #c0392b;
  font-size: var(--text-s);
}

.form-success {
  font-size: var(--text-m);
}
</style>
