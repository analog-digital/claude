import type { Metadata } from "next";
import { getContent } from "@/lib/cms";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { Hero } from "@/components/Hero";
import { MainSections } from "@/components/MainSections";

// Content is read from the CMS (D1) at request time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Storage Boxes Chilliwack",
  description:
    "Storage rentals in Chilliwack and beyond — mobile and daily-access storage boxes from 8 ft to 40 ft, with flexible month-to-month terms from Box It Up Storage.",
  alternates: { canonical: "/rental-new" },
};

/**
 * RENTALS PAGE — on the live site this uses the same Elementor template as the
 * home page (box sizes, services, booking, FAQ, etc.), differing only in the
 * hero heading. We mirror that by reusing <Hero> + <MainSections>.
 */
export default async function RentalPage() {
  const content = await getContent();
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Boxes For Rent", path: "/rental-new" },
        ])}
      />
      <Hero hero={content.hero} />
      <MainSections content={content} />
    </>
  );
}
