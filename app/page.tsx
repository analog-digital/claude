import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Secure Self Storage & Storage Boxes in Chilliwack, BC",
  description: SITE.description,
  alternates: { canonical: "/" },
};

/**
 * HOME PAGE — SCAFFOLD ONLY.
 * ⚠️ The copy and imagery below are NEUTRAL PLACEHOLDERS, not the real content.
 * Replace every section with the EXACT headings, paragraphs, images (WordPress
 * media URLs), colors and fonts from https://www.boxitupstorage.ca/ once the
 * site is reachable. Section structure mirrors a typical storage homepage so
 * the real content drops in with minimal re-layout.
 */
export default function HomePage() {
  return (
    <>
      {/* Build-time notice — remove once real content is in. */}
      <div className="bg-[var(--accent)]/15 px-4 py-2 text-center text-xs text-[var(--foreground)]">
        Placeholder content — pending exact copy &amp; imagery from the live site.
      </div>

      {/* HERO */}
      <section className="bg-[var(--muted)]">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-20 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
              Secure, Affordable Storage in Chilliwack
            </h1>
            <p className="mt-4 text-lg text-[var(--muted-foreground)]">
              {/* TODO: exact hero subheading */}
              Flexible self storage units and portable storage boxes with easy,
              month-to-month rentals. Store your way.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/rental-new"
                className="rounded-md bg-[var(--brand)] px-6 py-3 font-semibold text-[var(--brand-contrast)] hover:bg-[var(--brand-dark)]"
              >
                View Rentals
              </Link>
              <a
                href={`tel:${SITE.phone}`}
                className="rounded-md border border-[var(--brand)] px-6 py-3 font-semibold text-[var(--brand)] hover:bg-[var(--brand)]/10"
              >
                Call {SITE.phoneDisplay}
              </a>
            </div>
          </div>
          {/* TODO: replace with the real hero image (WP media URL) via next/image. */}
          <div className="aspect-[4/3] rounded-xl border border-dashed border-[var(--border)] bg-white/60 grid place-items-center text-sm text-[var(--muted-foreground)]">
            Hero image placeholder
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold">Why Box It Up Storage</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Secure Facility", "Fenced, gated and monitored for peace of mind."],
            ["Flexible Terms", "Month-to-month rentals with no long-term lock-in."],
            ["Easy Access", "Daily gate access from 7:00 AM to 8:00 PM."],
            ["Clean & Dry Units", "Well-maintained units in a range of sizes."],
            ["Portable Boxes", "Storage boxes delivered to your door."],
            ["Local & Friendly", "Locally operated, here to help you store smart."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-lg border border-[var(--border)] p-6">
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--brand)] text-[var(--brand-contrast)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-14 text-center">
          <h2 className="text-3xl font-bold">Ready to reserve your space?</h2>
          <p className="opacity-90">Get started in minutes — see what&apos;s available.</p>
          <Link
            href="/rental-new"
            className="mt-2 rounded-md bg-[var(--brand-contrast)] px-6 py-3 font-semibold text-[var(--brand)] hover:opacity-90"
          >
            Browse Rentals
          </Link>
        </div>
      </section>
    </>
  );
}
