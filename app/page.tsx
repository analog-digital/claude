import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { getContent } from "@/lib/cms";
import { Hero } from "@/components/Hero";
import { MainSections } from "@/components/MainSections";

// Content is read from the CMS (D1) at request time, so edits go live without
// a redeploy.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const content = await getContent();
  return (
    <>
      <Hero hero={content.hero} />
      <MainSections content={content} />
    </>
  );
}
