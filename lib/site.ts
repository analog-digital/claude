/**
 * Central site configuration — single source of truth for SEO metadata,
 * structured data (JSON-LD), navigation, and NAP (Name / Address / Phone).
 * Values transcribed from the live boxitupstorage.ca source.
 */

export const MEDIA = "https://www.boxitupstorage.ca/wp-content/uploads";

export const SITE = {
  name: "Box It Up Storage",
  shortName: "Box It Up",
  url: "https://www.boxitupstorage.ca",
  // Matches the live <title> / meta description for the home page.
  title: "Storage Boxes Chilliwack | Box It Up Storage",
  description:
    "Box It Up Storage offers customizable storage solutions for residential and commercial clients.",
  locale: "en_CA",
  phone: "+1-877-226-9488",
  phoneDisplay: "1-877-226-9488",
  phoneVanity: "1-877-2BOXITUP",
  email: "info@boxitupstorage.ca",
  address: {
    streetAddress: "44620 Skylark Road",
    addressLocality: "Chilliwack",
    addressRegion: "BC",
    postalCode: "V2R 6H5",
    addressCountry: "CA",
  },
  geo: { latitude: 49.1654691, longitude: -121.9868934 },
  mapsUrl:
    "https://www.google.com/maps/place/Box+It+Up+Storage/@49.1654726,-121.9894683,17z/data=!3m1!4b1!4m6!3m5!1s0x548447388a778223:0xc66e8fc770f08c13!8m2!3d49.1654691!4d-121.9868934!16s%2Fg%2F11swzklbx6",
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:00",
      closes: "20:00",
    },
  ],
  socials: {
    facebook: "https://www.facebook.com/boxitupstorage",
    instagram: "https://www.instagram.com/boxitup.storage/",
  },
  logo: {
    header: `${MEDIA}/2024/08/Box-It-Up-Logo.png`, // 1664×460 transparent PNG
    footer: `${MEDIA}/2024/08/Box-It-Up-Logo.jpg`, // 400×112
  },
  inquireUrl: "/inquire-today",
  copyright: "Copyright © 2024 Box It Up Storage. All rights reserved.",
  designer: { label: "Website Designed By Longhouse Branding & Marketing", href: "https://www.longhouse.co" },
} as const;

/** Primary navigation — slugs mirror the existing WordPress URLs for SEO continuity. */
export const NAV: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Boxes For Rent", href: "/boxes-for-rent" },
  { label: "Boxes For Sale", href: "/boxes-for-sale" },
  { label: "Contact", href: "/contact" },
];

/** Footer "Resources" column. */
export const FOOTER_LINKS: { label: string; href: string }[] = [
  { label: "About Us", href: "/about" },
  { label: "Boxes For Rent", href: "/boxes-for-rent" },
  { label: "Boxes For Sales", href: "/boxes-for-sale" },
  { label: "Contact Us", href: "/contact" },
];
