// @ts-check
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://someseeds.net",
  output: "server",
  adapter: cloudflare({ platformProxy: { enabled: true } }),
  integrations: [vue()],
  vite: {
    // GSAP's plugin subpaths are deep ESM imports; pre-bundle them so the
    // ImageSlider island doesn't trigger a mid-hydration re-optimization
    // ("Failed to fetch dynamically imported module").
    optimizeDeps: {
      include: ["gsap", "gsap/Draggable", "gsap/InertiaPlugin"],
    },
  },
});
