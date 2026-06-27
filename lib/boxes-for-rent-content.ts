/**
 * Content defaults + types for the /boxes-for-rent page (built from the Figma
 * "RentalPage" design, node 75:9). This is an INDEPENDENT content set — separate
 * from lib/content.ts (which drives the home & /rental-new pages) — so the two
 * can diverge freely. Each export below maps to a CMS section keyed `bfr_*`.
 *
 * Figma "content still needed" fields (per-box pricing, availability badge, star
 * rating, gallery link) default to "" and are only rendered once filled in the
 * CMS — nothing fake ships (CLAUDE.md §0, §4).
 *
 * Real starting copy (FAQ answers, story, services, etc.) is seeded from the
 * existing site content so the page is complete on day one; once edited in the
 * CMS these rows are fully independent.
 */
import {
  MEDIA,
  BOX_SIZES,
  HOW_IT_WORKS,
  SERVICES,
  STORY,
  PARTNERS,
  FAQS,
  TESTIMONIALS,
  FINAL_CTA,
} from "./content";

export type BfrFeature = { title: string; body: string };

export type BfrHero = {
  heading: string;
  subheading: string;
  backgroundImage: string;
  backgroundAlt: string;
  features: BfrFeature[];
  ctaLabel: string;
  ctaHref: string;
};

export type BfrBoxCard = {
  id: string;
  sizeLabel: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Gap fields — rendered only when filled. */
  pricing: string;
  dimensions: string;
  availabilityBadge: string;
  rating: string;
  galleryHref: string;
  /** Which storage modes this box supports (drives the legend dots). */
  availableMobile: boolean;
  availableDaily: boolean;
};

export type BfrBoxSizes = {
  label: string;
  description: string;
  legend: { label: string; mode: "mobile" | "daily" }[];
  cards: BfrBoxCard[];
};

export type BfrHowItWorks = {
  label: string;
  subHeading: string;
  description: string;
  image: string;
  imageAlt: string;
  requestQuoteLabel: string;
  callUsLabel: string;
};

export type BfrServiceCard = {
  title: string;
  accessBadge: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type BfrServices = {
  label: string;
  cards: BfrServiceCard[];
  learnMoreLabel: string;
  learnMoreHref: string;
};

export type BfrBookRental = {
  heading: string;
  subHeading: string;
  stepBadges: { num: string; text: string }[];
  selectorHeading: string;
  sizePrompt: string;
  sizeOptions: string[];
  servicePrompt: string;
  serviceOptions: string[];
  requestQuoteLabel: string;
  callUsLabel: string;
};

export type BfrStory = {
  eyebrow: string;
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
};

export type BfrPartners = { heading: string; logos: { src: string; alt: string }[] };

export type BfrTestimonials = {
  eyebrow: string;
  heading: string;
  items: { text: string; name: string; role: string }[];
  rating: { score: string; count: string; label: string };
  image: string;
  reviewsUrl: string;
};

export type BfrFinalCta = { heading: string; body: string; ctaLabel: string; ctaHref: string };

export const BFR_HERO: BfrHero = {
  heading: "Storage Rentals in Chilliwack and Beyond",
  subheading: "Feel confident knowing your belongings are safe with Box It Up rental services.",
  backgroundImage: `${MEDIA}/2025/04/box-it-up-1024x576.jpg`,
  backgroundAlt: "Box It Up Storage delivery truck with a portable storage container",
  features: [
    {
      title: "Convenient Access",
      body: "Say goodbye to long drives and strict facility hours—store your items close to home with flexible access.",
    },
    {
      title: "Secure Storage",
      body: "Rest easy knowing your valuables are protected in our 24/7 monitored facility.",
    },
  ],
  ctaLabel: "Book a Rental",
  ctaHref: "/inquire-today",
};

export const BFR_BOX_SIZES: BfrBoxSizes = {
  label: "OUR BOX SIZES AVAILABLE",
  description: BOX_SIZES.intro,
  legend: [
    { label: "Available For Mobile Storage", mode: "mobile" },
    { label: "Available For Daily Storage", mode: "daily" },
  ],
  cards: BOX_SIZES.slides.map((s) => ({
    id: s.title,
    sizeLabel: s.title,
    description: s.body,
    image: s.image,
    imageAlt: s.title,
    pricing: "", // gap — fill in CMS
    dimensions: "", // gap
    availabilityBadge: "", // gap
    rating: "", // gap
    galleryHref: "", // gap
    availableMobile: true,
    availableDaily: true,
  })),
};

export const BFR_HOW_IT_WORKS: BfrHowItWorks = {
  label: HOW_IT_WORKS.heading,
  subHeading: HOW_IT_WORKS.lead,
  description: HOW_IT_WORKS.paragraphs.join("\n\n"),
  image: HOW_IT_WORKS.image,
  imageAlt: "Open storage container at the Box It Up facility",
  requestQuoteLabel: "REQUEST A QUOTE",
  callUsLabel: "CALL US TODAY",
};

export const BFR_SERVICES: BfrServices = {
  label: SERVICES.heading,
  cards: SERVICES.cards.map((c) => ({
    title: c.title,
    accessBadge: c.badge,
    description: `${c.price} ${c.body}`.trim(),
    image: c.image,
    imageAlt: c.title,
  })),
  learnMoreLabel: "LEARN MORE",
  learnMoreHref: "/inquire-today",
};

export const BFR_BOOK_RENTAL: BfrBookRental = {
  heading: "BOOK YOUR RENTAL TODAY",
  subHeading: "Get in touch with us today to discuss your storage needs and find the perfect solution.",
  stepBadges: [
    { num: "Step One:", text: "Choose Your Box Size & Plan" },
    { num: "Step Two:", text: "Fill Out Our Inquiry Form" },
    { num: "Step Three:", text: "Talk To Us & Get Approved" },
    { num: "Step Four:", text: "Meet Your New Unit" },
  ],
  selectorHeading: "Choose Your Box Size & Options",
  sizePrompt: "Select the box that best fits your needs.",
  sizeOptions: ["8ft", "10ft", "20ft", "40ft"],
  servicePrompt: "Select the service that fits your needs.",
  serviceOptions: ["Daily Access", "Stackable Monthly Access", "Delivery To Door"],
  requestQuoteLabel: "REQUEST A QUOTE",
  callUsLabel: "CALL US TODAY",
};

export const BFR_STORY: BfrStory = {
  eyebrow: STORY.eyebrow,
  heading: STORY.heading,
  body: STORY.body,
  ctaLabel: STORY.cta.label,
  ctaHref: STORY.cta.href,
  image: STORY.image,
  imageAlt: STORY.heading,
};

export const BFR_PARTNERS: BfrPartners = {
  heading: PARTNERS.heading,
  logos: PARTNERS.logos,
};

export const BFR_FAQS: { q: string; a: string }[] = FAQS.slice(0, 5);

export const BFR_TESTIMONIALS: BfrTestimonials = {
  eyebrow: TESTIMONIALS.eyebrow,
  heading: TESTIMONIALS.heading,
  items: TESTIMONIALS.items,
  rating: TESTIMONIALS.rating,
  image: TESTIMONIALS.image,
  reviewsUrl: TESTIMONIALS.reviewsUrl,
};

export const BFR_FINAL_CTA: BfrFinalCta = {
  heading: FINAL_CTA.heading,
  body: FINAL_CTA.body,
  ctaLabel: FINAL_CTA.cta.label,
  ctaHref: FINAL_CTA.cta.href,
};

/** Typed shape of the whole page's content (saved overrides overlay these). */
export type BoxesForRentContent = {
  bfr_hero: BfrHero;
  bfr_box_sizes: BfrBoxSizes;
  bfr_how_it_works: BfrHowItWorks;
  bfr_services: BfrServices;
  bfr_book_rental: BfrBookRental;
  bfr_story: BfrStory;
  bfr_partners: BfrPartners;
  bfr_faqs: { q: string; a: string }[];
  bfr_testimonials: BfrTestimonials;
  bfr_final_cta: BfrFinalCta;
};

export const BOXES_FOR_RENT_DEFAULTS: BoxesForRentContent = {
  bfr_hero: BFR_HERO,
  bfr_box_sizes: BFR_BOX_SIZES,
  bfr_how_it_works: BFR_HOW_IT_WORKS,
  bfr_services: BFR_SERVICES,
  bfr_book_rental: BFR_BOOK_RENTAL,
  bfr_story: BFR_STORY,
  bfr_partners: BFR_PARTNERS,
  bfr_faqs: BFR_FAQS,
  bfr_testimonials: BFR_TESTIMONIALS,
  bfr_final_cta: BFR_FINAL_CTA,
};
