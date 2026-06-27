import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { HERO } from "@/lib/content";
import { Hero } from "@/components/Hero";
import { MainSections } from "@/components/MainSections";

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero hero={HERO} />
      <MainSections />
    </>
  );
}
