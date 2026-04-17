import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION,
  token: import.meta.env.SANITY_API_TOKEN,
});

// ── Pages ──
export async function getSimplePage(slug: string) {
  return sanityClient.fetch(
    `*[_type == "simple_page" && slug.current == $slug][0]{
      title,
      description,
      "image": image.asset->url,
      "category": category->{ title, slug },
      "tags": tags[]->{ title, slug }
    }`,
    { slug },
  );
}

// ── Navigation ──
export async function getNavigation() {
  return sanityClient.fetch(
    `*[_type == "navigation"][0]{
      "logo": logo.asset->url,
      links,
      footerLinks,
      footerSocialLinks
    }`,
  );
}

// ── Categories ──
export async function getAllCategories() {
  return sanityClient.fetch(
    `*[_type == "category"] | order(title asc){
      title,
      slug,
      description
    }`,
  );
}

// ── Tags ──
export async function getAllTags() {
  return sanityClient.fetch(
    `*[_type == "tag"] | order(title asc){
      title,
      slug
    }`,
  );
}
