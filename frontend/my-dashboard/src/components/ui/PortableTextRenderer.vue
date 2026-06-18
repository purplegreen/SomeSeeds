<template>
  <PortableText :value="body" :components="components" />
</template>

<script setup>
import { h } from "vue";
import { PortableText } from "@portabletext/vue";

const props = defineProps(["body"]);

const components = {
  block: {
    h2: (_, { slots }) => h("h2", { class: "heading_s_a" }, slots.default?.()),
  },
  marks: {
    link: ({ value }, { slots }) => {
      const target = value?.blank ? "_blank" : "_self";
      const rel = value?.blank ? "noopener noreferrer" : undefined;
      return h("a", { href: value?.href, target, rel }, slots.default?.());
    },
  },
};
</script>
