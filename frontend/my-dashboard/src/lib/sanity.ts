import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  useCdn: import.meta.env.PROD,
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION,
  token: import.meta.env.SANITY_API_TOKEN,
});

// ── Homepage ──
export async function getHomepage() {
  return sanityClient.fetch(
    `*[_type == "homepage" && _id == "homepage"][0]{
      heroText,
      "heroSvgOne": heroSvgOne.asset->url,
      "heroSvgTwo": heroSvgTwo.asset->url,
      "sections": sections[]{
        key,
        title,
        description
      },
      "slider": slider[]->{
        _type,
        title,
        "slug": slug.current,
        summary,
        "coverImage": coverImage.asset->url,
        type,
        status,
        startDate,
        startTime,
        endDate,
        location,
        "partnerInstitutions": partnerInstitutions[]{
          name,
          "logo": logo.asset->url,
          url
        },
        "explorations": explorations[]->{ title, "slug": slug.current },
        
      },
      "posterImageOne": posterImageOne.asset->url,
      "posterImageTwo": posterImageTwo.asset->url,
      "posterImageThree": posterImageThree.asset->url,
      "scrollBarSvgOne": scrollBarSvgOne.asset->url,
      "scrollBarSvgTwo": scrollBarSvgTwo.asset->url,
      seo {
        metaTitle,
        metaDescription,
        "ogImage": ogImage.asset->url
      }
    }`,
  );
}

// ── Contact Page ──
export async function getContactPage() {
  return sanityClient.fetch(
    `*[_type == "contact_page" && _id == "contact_page"][0]{
      title,
      description,
      body,
      destinationEmail,
      formFields[]{
        label,
        "fieldKey": fieldKey.current,
        fieldType,
        placeholder,
        required
      },
      submitButtonLabel,
      successMessage,
      seo {
        metaTitle,
        metaDescription,
        "ogImage": ogImage.asset->url
      }
    }`,
  );
}

// ── Pages ──
export async function getSimplePage(slug: string) {
  return sanityClient.fetch(
    `*[_type == "simple_page" && slug.current == $slug][0]{
      title,
      description,
      body,
      "image": image.asset->url,
      "category": category->{ title, slug },
      "tags": tags[]->{ title, slug },
      seo {
        metaTitle,
        metaDescription,
        "ogImage": ogImage.asset->url
      }
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
       activationsTitle,
      activationsDescription,
      emptyActivationsMessage,
      "collaborators": collaborators[]{
        name,
        "logo": logo.asset->url,
        url
      }
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
startTime,
endDate,
endTime,
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
      _id,
      title,
      "slug": slug.current,
      summary,
      type,
      status,
      startDate,
      startTime,
      endDate,
      endTime,
      location,
      overview,
      credits,
      "partnerInstitutions": partnerInstitutions[]{
        name,
        "logo": logo.asset->url,
        url
      },
      "coverImage": coverImage.asset->url,
      research{
      "posterImage": posterImage.asset->url,
        text,
        "images": images[]{
          "url": asset->url,
          caption
        },
        links
      },
      documentation{
      "posterImage": posterImage.asset->url,
        text,
        "images": images[]{
          "url": asset->url,
          caption
        }
      },
      outcomes[]{
        label,
        text,
        url
        },
      "explorations": explorations[]->{ title, "slug": slug.current },
      "categories": categories[]->{ title, slug },
      "tags": tags[]->{ title, slug }
    }`,
    { slug },
  );
}
