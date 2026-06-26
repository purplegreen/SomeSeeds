import type { MiddlewareHandler } from "astro";

// Edge-cache SSR HTML at Cloudflare. NOTE: Cloudflare Workers do not cache
// Worker responses from Cache-Control alone — a Cloudflare Cache Rule (or the
// Cache API) is still required for these headers to take effect at the edge.
export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();

  if (context.request.method !== "GET") return response;

  const contentType = response.headers.get("Content-Type") ?? "";
  if (!contentType.includes("text/html")) return response;

  if (response.status === 200) {
    if (!response.headers.has("Cache-Control")) {
      response.headers.set(
        "Cache-Control",
        "public, max-age=0, s-maxage=600, stale-while-revalidate=86400",
      );
    }
  } else {
    // 404s and other error pages should never be cached.
    response.headers.set("Cache-Control", "no-store");
  }

  return response;
};
