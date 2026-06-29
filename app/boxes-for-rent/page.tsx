import type { Metadata } from "next";
import { getBoxesForRentContent } from "@/lib/cms";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { BfrHero } from "@/components/bfr/BfrHero";
import { BfrBoxSizesCarousel } from "@/components/bfr/BfrBoxSizesCarousel";
import { BfrHowItWorks } from "@/components/bfr/BfrHowItWorks";
import { BfrServices } from "@/components/bfr/BfrServices";
import { BfrBookRental } from "@/components/bfr/BfrBookRental";
import { BfrStory } from "@/components/bfr/BfrStory";
import { BfrPartners } from "@/components/bfr/BfrPartners";
import { BfrFaq } from "@/components/bfr/BfrFaq";
import { BfrTestimonials } from "@/components/bfr/BfrTestimonials";
import { BfrFinalCta } from "@/components/bfr/BfrFinalCta";

// Content read from the CMS (D1) at request time; edits go live without redeploy.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Boxes For Rent",
  description:
    "Rent storage boxes in Chilliwack and beyond — mobile and daily-access units from 8 ft to 40 ft, with flexible month-to-month terms from Box It Up Storage.",
  alternates: { canonical: "/boxes-for-rent" },
};

/**
 * /boxes-for-rent — built from the Figma "RentalPage" design (node 75:9).
 * The page-scoped `theme-bfr` class applies the Figma palette without affecting
 * other pages. Content is the independent `bfr_*` CMS set; the box selector
 * routes selections into the /inquire-today quote flow → Submissions tab.
 */
export default async function BoxesForRentPage() {
  const c = await getBoxesForRentContent();

  return (
    <div className="theme-bfr bg-white text-[var(--color-text)]">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Boxes For Rent", path: "/boxes-for-rent" },
        ])}
      />
      <BfrHero hero={c.bfr_hero} />
      <BfrBoxSizesCarousel data={c.bfr_box_sizes} />
      <BfrHowItWorks data={c.bfr_how_it_works} />
      <BfrServices data={c.bfr_services} />
      <BfrBookRental data={c.bfr_book_rental} />
      <BfrStory data={c.bfr_story} />
      <BfrPartners data={c.bfr_partners} />
      <BfrFaq heading="FREQUENTLY ASKED QUESTIONS" faqs={c.bfr_faqs} />
      <BfrTestimonials data={c.bfr_testimonials} />
      <BfrFinalCta data={c.bfr_final_cta} />
    </div>
  );
}
