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
      body,
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
      ctaLink,
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
// ── Explorations ──
export async function getExplorations() {
  return sanityClient.fetch(
    `*[_type == "exploration" && defined(slug.current)] | order(title asc){
      title,
      "slug": slug.current,
      summary,
      "coverImage": coverImage.asset->url,
      "category": category->{ title, slug },
      "tags": tags[]->{ title, slug },
      "activations": *[_type == "activation" && references(^._id)] | order(startDate desc){
        title,
        "slug": slug.current,
        status,
        startDate,
        type,
        location,
        "partnerInstitutions": partnerInstitutions[]{
          name,
          "logo": logo.asset->url,
          url
        }
      }
    }`,
  );
}

export async function getExploration(slug: string) {
  return sanityClient.fetch(
    `*[_type == "exploration" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      summary,
      body,
      "coverImage": coverImage.asset->url,
      "category": category->{ title, slug },
      "tags": tags[]->{ title, slug },
      collaborators
    }`,
    { slug },
  );
}

// ── Activations ──
export async function getAllActivations() {
  return sanityClient.fetch(
    `*[_type == "activation" && defined(slug.current)]{ 
      "slug": slug.current 
    }`,
  );
}

export async function getActivationsByExploration(explorationId: string) {
  return sanityClient.fetch(
    `*[_type == "activation" && references($explorationId)] | order(startDate desc){
      title,
      "slug": slug.current,
      type,
      status,
      startDate,
      endDate,
      location,
      "coverImage": coverImage.asset->url,
        "partnerInstitutions": partnerInstitutions[]{
        name,
        "logo": logo.asset->url,
        url
  }
    }`,
    { explorationId },
  );
}

export async function getActivation(slug: string) {
  return sanityClient.fetch(
    `*[_type == "activation" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      type,
      status,
      startDate,
      endDate,
      location,
       "partnerInstitutions": partnerInstitutions[]{
        name,
        "logo": logo.asset->url,
        url
      },
      "coverImage": coverImage.asset->url,
      research{
        text,
        "images": images[]{
          "url": asset->url,
          caption
        },
        links
      },
      documentation{
        text,
        "images": images[]{
          "url": asset->url,
          caption
        }
      },
      outcomes,
      "explorations": explorations[]->{ title, "slug": slug.current },
      "categories": categories[]->{ title, slug },
      "tags": tags[]->{ title, slug }
    }`,
    { slug },
  );
}
