<template>
  <PortableText :value="body" :components="components" />
</template>

<script setup>
import { h } from "vue";
import { PortableText } from "@portabletext/vue";

const props = defineProps(["body"]);

const components = {
  marks: {
    link: ({ value }, { slots }) => {
      const target = value?.blank ? "_blank" : "_self";
      const rel = value?.blank ? "noopener noreferrer" : undefined;
      return h("a", { href: value?.href, target, rel }, slots.default?.());
    },
  },
};
</script>
