import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Storage Unit Rentals & Pricing",
  description:
    "Browse Box It Up Storage rental options in Chilliwack, BC — a range of unit sizes and portable storage boxes with flexible month-to-month terms.",
  alternates: { canonical: "/rental-new" },
};

/**
 * SERVICE / RENTALS PAGE — SCAFFOLD ONLY.
 * ⚠️ Placeholder copy, sizes and prices. Replace with the EXACT content,
 * unit sizes, pricing and imagery from
 * https://www.boxitupstorage.ca/rental-new/ once the site is reachable.
 * The /rental-new slug is intentionally preserved to retain existing SEO.
 */
export default function RentalPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Rentals", path: "/rental-new" },
        ])}
      />

      <div className="bg-[var(--accent)]/15 px-4 py-2 text-center text-xs text-[var(--foreground)]">
        Placeholder content — pending exact copy, pricing &amp; imagery from the live site.
      </div>

      {/* PAGE HEADER */}
      <section className="bg-[var(--muted)]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <nav aria-label="Breadcrumb" className="text-sm text-[var(--muted-foreground)]">
            <Link href="/" className="hover:text-[var(--brand)]">Home</Link>
            <span className="mx-2">/</span>
            <span aria-current="page">Rentals</span>
          </nav>
          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">Storage Rentals &amp; Pricing</h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--muted-foreground)]">
            {/* TODO: exact intro copy */}
            Choose the storage that fits your needs. Flexible month-to-month
            terms, no long-term commitment.
          </p>
        </div>
      </section>

      {/* UNIT / PRICING GRID */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold">Available Options</h2>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          TODO: replace sizes, descriptions and prices with exact values from the live page.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Small Unit", "5' × 5'", "$XX/mo", "Ideal for boxes and small furniture."],
            ["Medium Unit", "10' × 10'", "$XX/mo", "Fits the contents of a one-bedroom home."],
            ["Large Unit", "10' × 20'", "$XX/mo", "Great for vehicles or a multi-room move."],
            ["Portable Box", "Delivered", "$XX/mo", "We drop it off, you pack, we store it."],
          ].map(([name, size, price, body]) => (
            <div key={name} className="flex flex-col rounded-lg border border-[var(--border)] p-6">
              {/* TODO: unit photo (WP media URL) */}
              <div className="mb-4 aspect-video rounded-lg border border-dashed border-[var(--border)] bg-[var(--muted)] grid place-items-center text-xs text-[var(--muted-foreground)]">
                Image placeholder
              </div>
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-sm text-[var(--muted-foreground)]">{size}</p>
              <p className="mt-2 text-2xl font-bold text-[var(--brand)]">{price}</p>
              <p className="mt-2 flex-1 text-sm text-[var(--muted-foreground)]">{body}</p>
              {/* Future: this CTA will open the signup + payment flow (portal phase). */}
              <a
                href={`tel:${SITE.phone}`}
                className="mt-4 rounded-lg bg-[var(--brand)] px-4 py-2 text-center font-semibold text-[var(--brand-contrast)] hover:bg-[var(--brand-dark)]"
              >
                Reserve
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="bg-[var(--brand)] text-[var(--brand-contrast)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-14 text-center">
          <h2 className="text-3xl font-bold">Questions about a unit?</h2>
          <p className="opacity-90">Call us and we&apos;ll help you find the right fit.</p>
          <a
            href={`tel:${SITE.phone}`}
            className="mt-2 rounded-lg bg-[var(--brand-contrast)] px-6 py-3 font-semibold text-[var(--brand)] hover:opacity-90"
          >
            Call {SITE.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}
