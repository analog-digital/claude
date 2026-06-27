/**
 * Central site configuration — single source of truth for SEO metadata,
 * structured data (JSON-LD), navigation, and NAP (Name / Address / Phone).
 *
 * ⚠️  VERIFY-AGAINST-LIVE-SITE: The values below were assembled from a web
 * search because the live site (boxitupstorage.ca) is currently unreachable
 * from this build environment (egress policy 403). Anything marked `TODO`
 * must be confirmed against the real site before launch. Update this one file
 * and every page's metadata + structured data updates with it.
 */

export const SITE = {
  name: "Box It Up Storage",
  shortName: "Box It Up",
  // Canonical production origin. TODO: confirm www vs non-www canonical.
  url: "https://www.boxitupstorage.ca",
  // Used in <meta description> fallback and Open Graph.
  description:
    "Box It Up Storage offers secure, affordable self storage and portable storage boxes in Chilliwack, BC. Flexible month-to-month rentals with easy access.",
  locale: "en_CA",
  // Brand contact — Name / Address / Phone (NAP) must match the live site
  // and Google Business Profile EXACTLY for local SEO.
  phone: "+1-877-226-9488", // 1-877-2BOXITUP — TODO: confirm
  phoneDisplay: "1-877-2BOXITUP",
  email: "", // TODO: pull from /contact/
  address: {
    // TODO: VERIFY exact street address from /contact/ — search returned this.
    streetAddress: "44620 Skylark Road",
    addressLocality: "Chilliwack",
    addressRegion: "BC",
    postalCode: "V2R 6H5",
    addressCountry: "CA",
  },
  // Geo coordinates power the LocalBusiness map pin. TODO: confirm.
  geo: {
    latitude: 49.1579,
    longitude: -121.9515,
  },
  // Gate / access hours surfaced by search ("7am–8pm daily via automated gate").
  // TODO: confirm office hours vs gate-access hours separately.
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "07:00", closes: "20:00" },
  ],
  socials: {
    facebook: "https://www.facebook.com/boxitupstorage/",
    // TODO: add others if present on the live site.
  },
} as const;

/**
 * Primary navigation. Slugs intentionally mirror the existing WordPress URLs
 * so inbound links and search rankings carry over to the rebuild.
 */
export const NAV: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Rentals", href: "/rental-new" },
  { label: "Boxes for Rent", href: "/boxes-for-rent" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
