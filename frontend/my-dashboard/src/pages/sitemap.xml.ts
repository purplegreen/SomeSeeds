import type { APIRoute } from "astro";
import { getSitemapEntries } from "../lib/sanity";

// Static, always-present routes (exclude noindex utility pages like /404).
const STATIC_PATHS = [
  "/",
  "/explorations",
  "/about",
  "/approach",
  "/contact",
  "/privacy",
  "/imprint",
];

export const GET: APIRoute = async ({ site }) => {
  const origin = site ?? new URL("https://someseeds.net");

  const dynamicEntries = await getSitemapEntries();

  const entries = [
    ...STATIC_PATHS.map((path) => ({ path, lastmod: undefined as string | undefined })),
    ...dynamicEntries,
  ];

  const urls = entries
    .map(({ path, lastmod }) => {
      const loc = new URL(path, origin).href;
      const lastmodTag = lastmod ? `<lastmod>${lastmod}</lastmod>` : "";
      return `  <url><loc>${loc}</loc>${lastmodTag}</url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
};
