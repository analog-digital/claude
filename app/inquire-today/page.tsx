import type { Metadata } from "next";
import { Suspense } from "react";
import { getContent } from "@/lib/cms";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { QuoteWizard } from "@/components/QuoteWizard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Get a storage quote from Box It Up Storage in Chilliwack. Answer a few quick questions and we'll find the ideal box size and access plan for your needs.",
  alternates: { canonical: "/inquire-today" },
};

export default async function InquirePage() {
  const { quote_form } = await getContent();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Request a Quote", path: "/inquire-today" },
        ])}
      />

      {/* Header band */}
      <section className="bg-[var(--color-primary)] text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center md:py-20">
          <h1 className="text-3xl font-extrabold md:text-5xl">{quote_form.heading}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">{quote_form.subheading}</p>
        </div>
      </section>

      {/* Wizard */}
      <section className="mx-auto -mt-10 max-w-2xl px-4 pb-20">
        <Suspense fallback={<div className="rounded-lg border border-[var(--color-surface)] bg-white p-8 text-center text-[var(--color-text)]">Loading…</div>}>
          <QuoteWizard form={quote_form} />
        </Suspense>
      </section>
    </>
  );
}
