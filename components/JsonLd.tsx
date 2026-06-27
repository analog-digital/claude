import { SITE } from "@/lib/site";

/**
 * Renders a <script type="application/ld+json"> block. Structured data is
 * read by Google for rich results and is fully server-rendered here, so it is
 * present in the initial HTML (crawlable without JS).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, static content built from SITE config.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** LocalBusiness / SelfStorage schema — the most important entity for local SEO. */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SelfStorage",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    telephone: SITE.phone,
    ...(SITE.email ? { email: SITE.email } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.streetAddress,
      addressLocality: SITE.address.addressLocality,
      addressRegion: SITE.address.addressRegion,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    openingHoursSpecification: SITE.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: Object.values(SITE.socials).filter(Boolean),
  };
}

/** Site-wide WebSite schema (enables sitelinks search box eligibility). */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    inLanguage: "en-CA",
  };
}

/** BreadcrumbList schema for inner pages. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}
