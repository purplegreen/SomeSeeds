// @ts-check
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [vue(), sitemap()],
  vite: {
    // GSAP's plugin subpaths are deep ESM imports; pre-bundle them so the
    // ImageSlider island doesn't trigger a mid-hydration re-optimization
    // ("Failed to fetch dynamically imported module").
    optimizeDeps: {
      include: ["gsap", "gsap/Draggable", "gsap/InertiaPlugin"],
    },
  },
});
